import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "app";
import { appStarted } from "shared/config";
import 'index.css'

const render = async () => {
  const scope = fork();

  await allSettled(appStarted, { scope });

  const root = createRoot(document.getElementById("root")!)
  
  root.render(
    <StrictMode>
      <Provider value={scope}>
        <App />
      </Provider>
    </StrictMode>
  );
};

void render();
