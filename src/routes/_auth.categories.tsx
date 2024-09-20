import { createFileRoute } from '@tanstack/react-router';

import Categories from '../category/components/Categories/Categories';

export const Route = createFileRoute('/_auth/categories')({
  component: Categories,
});
