import { createFileRoute } from '@tanstack/react-router';

import Products from '../components/Products/Products';

export const Route = createFileRoute('/_auth/products')({
  component: Products,
});
