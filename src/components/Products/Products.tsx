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
      <Breadcrumbs title="Products" route="products">
        123
      </Breadcrumbs>
    </div>
  );
};

export default Products;
