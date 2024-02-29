import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from "atomic-router";
import { sample } from "effector";
import { createHashHistory } from "history";
import { appStarted } from "shared/init";

export const routes = {
  auth: {
    register: createRoute(),
    login: createRoute(),
  },
  dashboard: createRoute(),
  profile: createRoute(),
  reports: {
    index: createRoute(),
    edit: createRoute<{ id: number }>(),
    create: createRoute(),
  },
} as const;

export const $$controls = createRouterControls();

export const $$router = createHistoryRouter({
  routes: [
    {
      path: "/register",
      route: routes.auth.register,
    },
    {
      path: "/login",
      route: routes.auth.login,
    },
    {
      path: "/",
      route: routes.dashboard,
    },
  ],
  controls: $$controls,
});

sample({
  clock: appStarted,
  fn: () => createHashHistory(),
  target: $$router.setHistory,
});
