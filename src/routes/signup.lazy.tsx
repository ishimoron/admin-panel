import { createLazyFileRoute } from '@tanstack/react-router';

import SignUp from '../auth/components/SignUp/SignUp';

export const Route = createLazyFileRoute('/signup')({
  component: () => (
    <>
      <SignUp />
    </>
  ),
});
