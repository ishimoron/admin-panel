import Breadcrumbs from '../../../app/components/Breadcrumbs/Breadcrumbs';
import ProductsTable from '../ProductsTable/ProductsTable';

const Products = () => {
  // const { isUserAuthenticated } = useAuthCheck();

  // useEffect(() => {
  //   isUserAuthenticated();
  // }, []);
  return (
    <div>
      <Breadcrumbs title="Products" route="products">
        <ProductsTable />
      </Breadcrumbs>
    </div>
  );
};

export default Products;
