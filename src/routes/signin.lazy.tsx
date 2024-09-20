import { createLazyFileRoute } from '@tanstack/react-router';

import SignIn from '../auth/components/SignIn/SignIn';

export const Route = createLazyFileRoute('/signin')({
  component: () => (
    <>
      <SignIn />
    </>
  ),
});
