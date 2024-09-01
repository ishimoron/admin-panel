import { createFileRoute, redirect } from '@tanstack/react-router';

import { Routes_E } from '../components/enums/Routes_E';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    const { auth } = context;
    if (auth.loading) return;
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: Routes_E.SIGN_IN,
      });
    }
  },
});
