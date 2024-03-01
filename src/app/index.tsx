import { RouterProvider } from "atomic-router-react";
import { FC } from "react";
import { Pages } from "pages";
import { $$router } from "shared/router";
import { I18nextProvider } from "react-i18next";
import { useUnit } from "effector-react";
import { $i18nextInstance } from "shared/i18n";

const App: FC = () => {
  const i18n = useUnit($i18nextInstance)!;

  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={$$router}>
        <Pages />
      </RouterProvider>
    </I18nextProvider>
  );
};

export default App;
