import { API_E } from '../models/API_E';

const URL = import.meta.env.VITE_API_URL;

export const apiLogin = async (email: string, password: string) => {
  const res = await fetch(`${URL}/auth/signin`, {
    method: API_E.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return data;
};

export const apiRegister = async (
  username: string,
  email: string,
  password: string,
  role = 'user',
) => {
  const res = await fetch(`${URL}/auth/signup`, {
    method: API_E.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, role, password }),
  });

  const data = await res.json();
  return data;
};

export const apiVerifyToken = async (token: string) => {
  const res = await fetch(`http://localhost:4200/api/auth/verify`, {
    method: API_E.POST,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

export const apiRefreshToken = async (refreshToken: string) => {
  const res = await fetch(`${URL}/auth/refresh`, {
    method: API_E.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await res.json();
  return data;
};
