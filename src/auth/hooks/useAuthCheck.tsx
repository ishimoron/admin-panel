import { useNavigate } from '@tanstack/react-router';

import { Routes_E } from '../../app/models/Routes_E';
import { useAuth } from '../auth';

export const useAuthCheck = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const isUserAuthenticated = () => {
    if (!auth?.loading && !auth?.isAuthenticated) {
      navigate({ to: Routes_E.HOME });
    }
  };

  // return { isUserAuthenticated };
};
