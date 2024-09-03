import { getToken } from '../components/utils/authUtils';
import { API_E } from '../enums/API_E';

const URL = import.meta.env.VITE_API_URL;

const access_token = getToken();

export const apiGetCategories = async () => {
  const res = await fetch(`${URL}/category`, {
    method: API_E.GET,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const categories = await res.json();
  return categories;
};
