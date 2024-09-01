import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useAuth } from '../Auth/auth';
import { Routes_E } from '../enums/Routes_E';

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.loading && !auth?.isAuthenticated) {
      navigate({ to: Routes_E.HOME });
    }
  }, [auth?.loading, auth?.isAuthenticated]);

  if (auth?.loading || !auth?.isAuthenticated) {
    return;
  }

  const logOut = () => {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: '/' });
      });
    });
  };

  return (
    <div>
      <div> Welcome: {auth.user?.username}!</div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Dashboard;
