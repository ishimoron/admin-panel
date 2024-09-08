import { useEffect } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { useAuthCheck } from '../hooks/useAuthCheck';

const Products = () => {
  const { isUserAuthenticated } = useAuthCheck();

  useEffect(() => {
    isUserAuthenticated();
  }, []);
  return (
    <div>
<<<<<<< HEAD
      <Breadcrumbs title="Products" route="products">
        123
      </Breadcrumbs>
=======
      <Breadcrumbs title="Products" />
>>>>>>> 7928efc9b72923147c5ed189d8d440350aa9f663
    </div>
  );
};

export default Products;
