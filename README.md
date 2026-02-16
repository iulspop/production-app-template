# Production App Template

Starter template for production apps that need reliability, data durability, and multi-user support. Postgres on Fly.io with 2-machine canary deploy.

Use for apps where uptime and data integrity matter.

See `production-app-template-with-demo` for a working reference implementation.

## Getting Started

```bash
cp -r production-app-template my-app
cd my-app
pnpm install
cp .env.example .env
# Requires a local Postgres running:
pnpm prisma migrate dev --name init
pnpm dev
```

Your application will be available at `http://localhost:5173`.
