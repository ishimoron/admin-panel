import { useEffect } from 'react';

import { useAuth } from '../Auth/auth';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { useAuthCheck } from '../hooks/useAuthCheck';
import styles from './style.module.scss';

const Dashboard = () => {
  const auth = useAuth();
  const { isUserAuthenticated } = useAuthCheck();

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  if (auth?.loading || !auth?.isAuthenticated) {
    return;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Breadcrumbs title="Dashboard" route="dashboard">
        <div> Welcome: {auth.user?.username}!</div>
      </Breadcrumbs>
    </div>
  );
};

export default Dashboard;
