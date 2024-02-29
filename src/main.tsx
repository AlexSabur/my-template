import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "app";
import { appStarted } from "shared/init";

const main = async () => {
  const scope = fork();

  await allSettled(appStarted, { scope });

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider value={scope}>
        <App />
      </Provider>
    </StrictMode>
  );
};

void main();
