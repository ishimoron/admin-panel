// /src/routes/__root.tsx
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import { QueryClient } from '@tanstack/react-query';
import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { IAuthContext } from '../components/Auth/Auth_I';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

export interface IRouterContext {
  auth: IAuthContext;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/signin' || location.pathname === 'signup';
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        {!isAuthPage && <Sidebar />}
        <Header />
      </CssVarsProvider>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
