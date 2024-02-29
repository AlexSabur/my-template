import i18next from "i18next";
import cookie from "js-cookie";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next);

i18next.on("languageChanged", (lng) => {
  if (!import.meta.env.SSR) {
    window.document.documentElement.lang = lng;
  }

  cookie.set("app_lang", lng);
});

export { i18next };
