import { createRouteView } from "atomic-router-react";
import { createPageView } from "shared/utils";
import { anonymousRoute, currentRoute } from "./model.ts";

export default {
  view: createRouteView({
    route: anonymousRoute,
    view: createPageView(() => import("./page.tsx")),
  }),
  route: currentRoute,
};
