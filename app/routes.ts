import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("verify", "routes/verify.tsx"),
  route("onboarding", "routes/onboarding.tsx"),
  route("auth/callback", "routes/auth.callback.tsx"),
  route("logout", "routes/logout.tsx"),
  route("healthcheck", "routes/healthcheck.tsx"),
] satisfies RouteConfig;
