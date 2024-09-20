import { createFileRoute, redirect } from '@tanstack/react-router';

import { Routes_E } from '../app/models/Routes_E';
import { getToken } from '../auth/utils/authUtils';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const token = getToken();
    if (!token) {
      throw redirect({
        to: Routes_E.SIGN_IN,
      });
    }
  },
});
