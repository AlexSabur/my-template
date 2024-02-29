import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "app";
import { appStarted } from "shared/config";
import 'index.css'
import { $i18nextInstance, i18next } from "shared/i18n";

const render = async () => {
  const i18n = i18next.createInstance({debug: true});
  
  const scope = fork({
    values: [[$i18nextInstance, i18n]],
  });

  await allSettled(appStarted, { scope });

  const root = createRoot(document.getElementById("root")!)
  
  root.render(
    <StrictMode>
      <Provider value={scope}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </StrictMode>
  );
};

void render();
