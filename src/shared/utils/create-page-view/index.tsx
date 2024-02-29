import { FC, Suspense, lazy } from "react";

export default function createPageView(importFn: () => Promise<{ default: FC }>) {
  const Page = lazy(importFn);

  return () => {
    return (
      <Suspense fallback={<h1>загрузка</h1>}>
        <Page />
      </Suspense>
    );
  };
}
