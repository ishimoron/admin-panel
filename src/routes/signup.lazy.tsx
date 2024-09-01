import { createLazyFileRoute } from '@tanstack/react-router';

import SignUp from '../components/Auth/SignUp/SignUp';

export const Route = createLazyFileRoute('/signup')({
  component: () => (
    <>
      <SignUp />
    </>
  ),
});
