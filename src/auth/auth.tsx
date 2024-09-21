import React, { useCallback, useContext, useEffect, useState } from 'react';

import { AuthUser, IAuthContext } from './models/Auth_I';
import {
  apiLogin,
  apiRefreshToken,
  apiRegister,
  apiVerifyToken,
} from './services/auth.services';

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
const token = import.meta.env.VITE_TOKEN;
const refreshToken = import.meta.env.VITE_REFRESH_TOKEN;
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

  const getRefreshToken = () => {
    return localStorage.getItem(refreshToken) || null;
  };

  const setStoreToken = (
    access_token: string | null,
    refresh_token: string | null,
  ) => {
    if (access_token) {
      localStorage.setItem(token, access_token);
    } else {
      localStorage.removeItem(token);
    }
    if (refresh_token) {
      localStorage.setItem(refreshToken, refresh_token);
    } else {
      localStorage.removeItem(refreshToken);
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { access_token, refresh_token, ...response } = await apiLogin(
        email,
        password,
      );

      if (Array.isArray(response.message)) {
        setError(() => [...response.message]);
      } else if (response.message) {
        setError(() => [response.message]);
      } else {
        setUser(response);
        setStoreToken(access_token, refresh_token);
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
        const { access_token, refresh_token, ...response } = await apiRegister(
          username,
          email,
          password,
        );

        if (Array.isArray(response.message)) {
          setError(() => [...response.message]);
        } else if (response.message) {
          setError(() => [response.message]);
        } else {
          setUser(response);
          setStoreToken(access_token, refresh_token);
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

  const logout = useCallback(() => {
    setStoreToken(null, null);
    setUser(null);
    setError([]);

    // window.location.href = '/signin';
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
      if (!user) {
        return false;
      }
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

  const refreshTokenHandler = useCallback(async () => {
    const currentRefreshToken = localStorage.getItem(refreshToken);
    if (!currentRefreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const { access_token } = await apiRefreshToken(currentRefreshToken);
      const refresh_token = getRefreshToken();
      setStoreToken(access_token, refresh_token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(() => [error.message]);
      } else {
        setError(() => ['Error occurred while refreshing token']);
      }
      logout();
    }
  }, [logout]);

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
        refreshTokenHandler,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProviderContext');
  }
  return context;
};
