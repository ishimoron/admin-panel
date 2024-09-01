import { createLazyFileRoute } from '@tanstack/react-router';

import SignIn from '../components/Auth/SignIn/SignIn';

export const Route = createLazyFileRoute('/signin')({
  component: () => (
    <>
      <SignIn />
    </>
  ),
});
