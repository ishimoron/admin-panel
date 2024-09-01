const URL = 'http://localhost:4200/api';

export const apiLogin = async (email: string, password: string) => {
  const res = await fetch(`${URL}/auth/signin`, {
    method: 'POST',
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
    method: 'POST',
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
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};
