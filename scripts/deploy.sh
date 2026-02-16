#!/usr/bin/env bash
set -euo pipefail

# Idempotent Fly.io deploy script for Postgres-backed production app.
# Creates app + Postgres cluster if missing, attaches DB, stages secrets,
# runs migrations, then deploys with canary strategy.
#
# Usage:
#   SESSION_SECRET=xxx RESEND_API_KEY=re_xxx EMAIL_FROM=noreply@example.com ./scripts/deploy.sh

# --- Prerequisites -----------------------------------------------------------

if ! command -v flyctl &>/dev/null; then
  echo "Error: flyctl is not installed. Install it from https://fly.io/docs/flyctl/install/"
  exit 1
fi

if ! flyctl auth whoami &>/dev/null; then
  echo "Error: not authenticated with Fly.io. Run 'flyctl auth login' first."
  exit 1
fi

# --- Read config from fly.toml -----------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FLY_TOML="$PROJECT_DIR/fly.toml"

if [[ ! -f "$FLY_TOML" ]]; then
  echo "Error: fly.toml not found at $FLY_TOML"
  exit 1
fi

APP_NAME=$(grep '^app' "$FLY_TOML" | head -1 | sed 's/.*= *"\(.*\)"/\1/')
REGION=$(grep '^primary_region' "$FLY_TOML" | head -1 | sed 's/.*= *"\(.*\)"/\1/')
PG_APP="${APP_NAME}-db"

echo "App:    $APP_NAME"
echo "Region: $REGION"
echo "PG App: $PG_APP"

# --- Create app if it doesn't exist ------------------------------------------

if flyctl apps list --json | grep -q "\"$APP_NAME\""; then
  echo "App '$APP_NAME' already exists."
else
  echo "Creating app '$APP_NAME'..."
  flyctl apps create "$APP_NAME" --org personal
fi

# --- Create Postgres cluster if it doesn't exist -----------------------------

if flyctl apps list --json | grep -q "\"$PG_APP\""; then
  echo "Postgres cluster '$PG_APP' already exists."
else
  echo "Creating Postgres cluster '$PG_APP'..."
  flyctl postgres create --name "$PG_APP" --org personal --region "$REGION" \
    --vm-size shared-cpu-1x --initial-cluster-size 1 --volume-size 1
fi

# --- Attach Postgres to app (injects DATABASE_URL) ---------------------------

if flyctl secrets list --app "$APP_NAME" --json 2>/dev/null | grep -q '"DATABASE_URL"'; then
  echo "DATABASE_URL already set (Postgres already attached)."
else
  echo "Attaching Postgres cluster to app..."
  flyctl postgres attach "$PG_APP" --app "$APP_NAME" --yes
fi

# --- Stage secrets ------------------------------------------------------------

SECRETS_TO_SET=""

if [[ -n "${SESSION_SECRET:-}" ]]; then
  SECRETS_TO_SET+="SESSION_SECRET=$SESSION_SECRET "
else
  echo "Warning: SESSION_SECRET not set in environment, skipping (assumes already configured)."
fi

if [[ -n "${RESEND_API_KEY:-}" ]]; then
  SECRETS_TO_SET+="RESEND_API_KEY=$RESEND_API_KEY "
else
  echo "Warning: RESEND_API_KEY not set in environment, skipping (assumes already configured)."
fi

if [[ -n "${EMAIL_FROM:-}" ]]; then
  SECRETS_TO_SET+="EMAIL_FROM=$EMAIL_FROM "
else
  echo "Warning: EMAIL_FROM not set in environment, skipping (assumes already configured)."
fi

if [[ -n "$SECRETS_TO_SET" ]]; then
  echo "Staging secrets..."
  flyctl secrets set $SECRETS_TO_SET --app "$APP_NAME" --stage
fi

# --- First deploy (need a machine before we can run migrations) ---------------

MACHINE_COUNT=$(flyctl machines list --app "$APP_NAME" --json 2>/dev/null | grep -c '"id"' || echo "0")

if [[ "$MACHINE_COUNT" -eq 0 ]]; then
  echo "First deploy: creating initial machine..."
  flyctl deploy --app "$APP_NAME" --config "$FLY_TOML"
fi

# --- Run migrations -----------------------------------------------------------

echo "Running database migrations..."
flyctl ssh console --app "$APP_NAME" --command \
  "node ./node_modules/prisma/build/index.js migrate deploy"

# --- Deploy -------------------------------------------------------------------

echo "Deploying..."
flyctl deploy --app "$APP_NAME" --config "$FLY_TOML"

echo ""
echo "Deploy complete!"
echo ""
echo "Next steps (first deploy only):"
echo "  1. Generate a deploy token:  flyctl tokens create deploy --app $APP_NAME"
echo "  2. Add FLY_API_TOKEN to your GitHub repo secrets"
