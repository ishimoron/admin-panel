import { useEffect } from 'react';

import Breadcrumbs from '../../../app/components/Breadcrumbs/Breadcrumbs';
import { useAuthCheck } from '../../../auth/hooks/useAuthCheck';

const Products = () => {
  // const { isUserAuthenticated } = useAuthCheck();

  // useEffect(() => {
  //   isUserAuthenticated();
  // }, []);
  return (
    <div>
      <Breadcrumbs title="Products" route="products">
        123
      </Breadcrumbs>
    </div>
  );
};

export default Products;
