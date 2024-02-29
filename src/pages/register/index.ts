import { RouteRecord, createRouteView } from "atomic-router-react";
import { currentRoute } from "./model.ts";
import { createPageView } from "shared/utils";

export default {
  view: createRouteView({
    route: currentRoute,
    view: createPageView(() => import("./page.tsx")),
  }),
  route: currentRoute,
} satisfies RouteRecord<any, any>;
