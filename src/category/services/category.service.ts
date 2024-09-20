import { API_E } from '../../auth/models/API_E';
import { IAuthContext } from '../../auth/models/Auth_I';
import { getToken } from '../../auth/utils/authUtils';
import {
  apiCreateCategoryFromParentIdProps,
  apiCreateIconPathProps,
  apiCreateNewCategoryProps,
  apiDeleteCategoryProps,
  apiUpdateCategoryProps,
} from '../models/CategoriesApi_I';
import { Categories_I } from '../models/Categories_I';

const URL = import.meta.env.VITE_API_URL;

export const apiGetCategories = async ({
  refreshTokenHandler,
  logout,
}: Partial<IAuthContext>): Promise<Categories_I[]> => {
  let access_token = getToken();
  try {
    const res = await fetch(`${URL}/category`, {
      method: API_E.GET,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.status === 401) {
      if (refreshTokenHandler) await refreshTokenHandler();
      access_token = getToken();

      const retryRes = await fetch(`${URL}/category`, {
        method: API_E.GET,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!retryRes.ok)
        throw new Error('Error fetching categories after retry');
      return await retryRes.json();
    }

    if (!res.ok) throw new Error('Error fetching categories');
    return await res.json();
  } catch (error) {
    console.error(error);
    if (logout) logout();
    throw new Error('Failed to fetch categories');
  }
};

export const apiCreateIconPath = async ({
  refreshTokenHandler,
  logout,
  fileIcon,
}: Partial<apiCreateIconPathProps>): Promise<{
  message: string;
  fileUrl?: string;
}> => {
  let access_token = getToken();
  const localUrl = `${URL}/icons/upload`;
  const formData = new FormData();
  if (fileIcon) {
    formData.append('icon', fileIcon);
  }
  try {
    const res = await fetch(localUrl, {
      method: API_E.POST,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });

    if (res.status === 401) {
      if (refreshTokenHandler) await refreshTokenHandler();
      access_token = getToken();

      const retryRes = await fetch(localUrl, {
        method: API_E.POST,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });

      return await retryRes.json();
    }

    return await res.json();
  } catch (error) {
    if (logout) logout();
    return {
      message: 'Failed to create iconPath',
    };
  }
};

export const apiCreateNewCategory = async ({
  refreshTokenHandler,
  logout,
  newCategory,
  fileUrl,
}: Partial<apiCreateNewCategoryProps>) => {
  let access_token = getToken();
  const localUrl = `${URL}/category/create`;
  const newCategoryWithFileUrl = fileUrl
    ? { ...newCategory, iconPath: fileUrl }
    : { ...newCategory, iconPath: '' };
  try {
    const res = await fetch(localUrl, {
      method: API_E.POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(newCategoryWithFileUrl),
    });

    if (res.status === 401) {
      if (refreshTokenHandler) await refreshTokenHandler();
      access_token = getToken();

      const retryRes = await fetch(localUrl, {
        method: API_E.POST,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(newCategoryWithFileUrl),
      });

      return await retryRes.json();
    }

    return await res.json();
  } catch (error) {
    if (logout) logout();
    return {
      error: 'Error',
      message: 'Failed to create category',
    };
  }
};

export const apiCreateCategoryFromParentId = async ({
  refreshTokenHandler,
  logout,
  newParentCategory,
  fileUrl,
}: Partial<apiCreateCategoryFromParentIdProps>) => {
  let access_token = getToken();
  const localUrl = `${URL}/category/create`;
  const newParentCategoryWithFileUrl = fileUrl
    ? { ...newParentCategory, iconPath: fileUrl }
    : { ...newParentCategory, iconPath: '' };
  try {
    const res = await fetch(localUrl, {
      method: API_E.POST,
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(newParentCategoryWithFileUrl),
    });

    if (res.status === 401) {
      if (refreshTokenHandler) await refreshTokenHandler();
      access_token = getToken();

      const retryRes = await fetch(localUrl, {
        method: API_E.POST,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(newParentCategoryWithFileUrl),
      });

      return await retryRes.json();
    }

    return await res.json();
  } catch (error) {
    if (logout) logout();
    return {
      error: 'Error',
      message: 'Failed to create category',
    };
  }
};

export const apiDeleteCategory = async ({
  refreshTokenHandler,
  logout,
  id,
}: Partial<apiDeleteCategoryProps>): Promise<void> => {
  let access_token = getToken();
  const localUrl = `${URL}/category/${id}`;
  try {
    const res = await fetch(localUrl, {
      method: API_E.DELETE,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.status === 401) {
      if (refreshTokenHandler) await refreshTokenHandler();
      access_token = getToken();

      const retryRes = await fetch(localUrl, {
        method: API_E.DELETE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!retryRes.ok) throw new Error('Error deleting category after retry');
      return await retryRes.json();
    }

    if (!res.ok) throw new Error('Error deleting category');
    return await res.json();
  } catch (error) {
    console.error(error);
    if (logout) logout();
    throw new Error('Failed deleting category');
  }
};

export const apiUpdateCategory = async ({
  refreshTokenHandler,
  logout,
  id,
  categoryName,
}: Partial<apiUpdateCategoryProps>) => {
  let access_token = getToken();
  const localUrl = `${URL}/category`;
  const updateCategoryDto = {
    id: id ?? 0,
    name: categoryName ?? '',
  };
  try {
    const res = await fetch(localUrl, {
      method: API_E.PUT,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(updateCategoryDto),
    });

    if (res.status === 401) {
      if (refreshTokenHandler) await refreshTokenHandler();
      access_token = getToken();

      const retryRes = await fetch(localUrl, {
        method: API_E.PUT,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(updateCategoryDto),
      });

      return await retryRes.json();
    }

    return await res.json();
  } catch (error) {
    if (logout) logout();
    return {
      error: 'Error',
      message: 'Failed to create category',
    };
  }
};
