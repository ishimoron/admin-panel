import { useRouter } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';

import { Routes_E } from '../../../enums/Routes_E';
import { useAuth } from '../auth';
import styles from './style.module.scss';

const SignIn = () => {
  const [email, setEmail] = useState<string>('admin@gmail.com');
  const [password, setPassword] = useState<string>('1q2w3e4rA$');
  const auth = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth?.signIn(email, password);
      await router.invalidate();
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('Error occurred during verifying token');
      }
    }
  };

  useEffect(() => {
    if (auth?.isAuthenticated) {
      router.navigate({ to: Routes_E.DASHBOARD });
    }
  }, [auth?.loading, auth?.isAuthenticated]);

  return (
    <div>
      {/* <ThemeSwitcher></ThemeSwitcher> */}
      <div className={styles.signInContainer}>
        <div>
          <h1>Sign In</h1>
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

            <InputText
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="email"
              aria-describedby="user-email"
              aria-invalid="false"
            />

            <InputText
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="password"
              aria-describedby="user-password"
              aria-invalid="false"
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div>1</div>
      </div>
    </div>
  );
};
export default SignIn;
