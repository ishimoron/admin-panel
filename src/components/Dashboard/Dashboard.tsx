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
<<<<<<< HEAD
      <Breadcrumbs title="Dashboard" route="dashboard">
        <div> Welcome: {auth.user?.username}!</div>
      </Breadcrumbs>
=======
      <Breadcrumbs title="Dashboard" route="dashboard" />
      <div> Welcome: {auth.user?.username}!</div>
>>>>>>> 7928efc9b72923147c5ed189d8d440350aa9f663
    </div>
  );
};

export default Dashboard;
