import { createRoutesView, RouteRecord } from "atomic-router-react";

const imports = import.meta.glob<true, string, RouteRecord<any, any>>(
  ["./*/index.ts", "./*/index.tsx"],
  {
    import: "default",
    eager: true,
  }
);

export const Pages = createRoutesView({
  routes: Object.entries(imports).map(([_, page]) => page),
});
