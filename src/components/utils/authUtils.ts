const token = import.meta.env.VITE_TOKEN;
export const getToken = () => {
  return localStorage.getItem(token) || null;
};
