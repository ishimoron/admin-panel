import React, { useCallback, useContext, useEffect, useState } from 'react';

import { apiLogin, apiRegister, apiVerifyToken } from '../../api/auth.api';
import { AuthUser, IAuthContext } from './Auth_I';

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
const token = import.meta.env.VITE_TOKEN;

export const AuthProviderContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = !!user;

  const getToken = () => {
    return localStorage.getItem(token) || null;
  };

  const setStoreToken = (access_token: string | null) => {
    if (access_token) {
      localStorage.setItem(token, access_token);
    } else {
      localStorage.removeItem(token);
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { access_token, ...response } = await apiLogin(email, password);
      console.log(response);

      if (Array.isArray(response.message)) {
        setError(() => [...response.message]);
      } else if (response.message) {
        setError(() => [response.message]);
      } else {
        setUser(response);
        setStoreToken(access_token);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(() => [error.message]);
      } else {
        setError(() => ['Unknown error occurred during sign in']);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // const signInAfterSignUp = async (email: string, )

  const signUp = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        const { access_token, ...response } = await apiRegister(
          username,
          email,
          password,
        );
        console.log(response);

        if (Array.isArray(response.message)) {
          setError(() => [...response.message]);
        } else if (response.message) {
          setError(() => [response.message]);
        } else {
          setUser(response);
          setStoreToken(access_token);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(() => [error.message]);
        } else {
          setError(() => ['Unknown error occurred during sign up']);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setStoreToken(null);
    setUser(null);
    setError([]);
  }, []);

  const verifyToken = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { result: user } = await apiVerifyToken(token);
      setUser(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(() => [err.message]);
      } else {
        setError(() => ['Error occurred during verifying token']);
      }
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        error,
        signIn,
        signUp,
        logout,
        getToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
