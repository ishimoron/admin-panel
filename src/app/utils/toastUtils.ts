import { Bounce, toast } from 'react-toastify';

const getToastTheme = () => {
  const theme = localStorage.getItem('joy-mode');
  return theme === 'light' ? 'light' : 'dark';
};

export const getErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: getToastTheme(),
    transition: Bounce,
  });
};
