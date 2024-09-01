// /src/routes/__root.tsx
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { IAuthContext } from '../components/Auth/Auth_I';

export interface IRouterContext {
  auth: IAuthContext;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
