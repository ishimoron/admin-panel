import { Button } from '@mui/joy';
import { Link, useNavigate } from '@tanstack/react-router';

import { useAuth } from '../../../auth/auth';
import { Routes_E } from '../../models/Routes_E';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  // const { isUserAuthenticated } = useAuthCheck();

  // useEffect(() => {
  //   isUserAuthenticated();
  // }, []);

  // if (auth?.loading || !auth?.isAuthenticated) {
  //   return;
  // }

  return (
    <div>
      <Breadcrumbs title="Dashboard" route="dashboard">
        <div> Welcome: {auth.user?.username}!</div>
        <Link to="/categories">categoroes</Link>
        <Button
          onClick={() => {
            auth.logout();
            navigate({ to: Routes_E.SIGN_IN });
          }}
        >
          Logout
        </Button>
      </Breadcrumbs>
    </div>
  );
};

export default Dashboard;
