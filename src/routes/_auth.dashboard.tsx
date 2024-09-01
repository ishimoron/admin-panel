import { createFileRoute } from '@tanstack/react-router';

import Dashboard from '../components/Dashboard/Dashboard';

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
});
