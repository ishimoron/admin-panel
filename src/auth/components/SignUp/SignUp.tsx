import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { Routes_E } from '../../../app/models/Routes_E';
import { useAuth } from '../../auth';

const SignUp = () => {
  const [username, setUsername] = useState<string>('123');
  const [email, setEmail] = useState<string>('dsfds@mail.ru');
  const [password, setPassword] = useState<string>('1q2w3e4rA$');
  const auth = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth?.signUp(username, email, password);

      await router.invalidate();
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('Error occurred during verifying token');
      }
    }
  };

  console.log(auth?.error);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      router.navigate({ to: Routes_E.DASHBOARD });
    }
  }, [auth?.loading, auth?.isAuthenticated]);
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleFormSubmit}>
        <span>
          {auth?.error && (
            <div>
              {auth.error.map((err, i) => (
                <span style={{ color: 'red', display: 'block' }} key={i}>
                  {err}
                </span>
              ))}
            </div>
          )}
        </span>

        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"
          aria-describedby="user-username"
          aria-invalid="false"
        />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
          aria-describedby="user-email"
          aria-invalid="false"
        />

        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          aria-describedby="user-password"
          aria-invalid="false"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
