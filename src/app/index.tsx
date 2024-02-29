import { RouterProvider } from "atomic-router-react";
import { FC } from "react";
import { Pages } from "pages";
import { $$router } from "shared/routing";

const App: FC = () => {
  return (
    <RouterProvider router={$$router}>
      <Pages />
    </RouterProvider>
  );
};

export default App;
