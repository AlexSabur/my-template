import { chainAnonymous } from "shared/chain";
import { routes } from "shared/router";

export const currentRoute = routes.auth.login;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.dashboard.open,
});
