import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { PrimeReactProvider } from 'primereact/api';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthProviderContext, useAuth } from './components/Auth/auth';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const Router = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AuthProviderContext>
        <PrimeReactProvider>
          <App />
          <Router />
        </PrimeReactProvider>
      </AuthProviderContext>
    </QueryClientProvider>,
  );
}
