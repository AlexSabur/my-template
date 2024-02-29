import { RouteRecord, createRouteView } from "atomic-router-react";
import { createPageView } from "shared/utils";
import { currentRoute } from "./model.ts";

export default {
  view: createRouteView({
    route: currentRoute,
    view: createPageView(() => import("./page.tsx")),
  }),
  route: currentRoute,
} satisfies RouteRecord<any, any>;
