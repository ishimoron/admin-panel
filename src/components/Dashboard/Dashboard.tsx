import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useAuth } from '../Auth/auth';
import Sidebar from '../Sidebar/Sidebar';
import { useAuthCheck } from '../hooks/useAuthCheck';
import styles from './style.module.scss';

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const { isUserAuthenticated } = useAuthCheck();

  useEffect(() => {
    isUserAuthenticated();
  }, []);

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
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div> Welcome: {auth.user?.username}!</div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Dashboard;
