import { createI18nextIntegration } from "@withease/i18next";
import { createStore } from "effector";
import { i18n } from "i18next";
import { appStarted } from "shared/config";

// Create Store for i18next instance
export const $i18nextInstance = createStore<i18n | null>(null, {
  serialize: "ignore",
});

export const $$integration = createI18nextIntegration({
  // Pass Store with i18next instance to the integration
  instance: $i18nextInstance,
  setup: appStarted,
});
