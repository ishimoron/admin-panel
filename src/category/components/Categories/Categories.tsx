import { Box, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Breadcrumbs from '../../../app/components/Breadcrumbs/Breadcrumbs';
import Loading from '../../../app/components/Loading/Loading';
import { useAuth } from '../../../auth/auth';
import { Categories_I, TreeViewCategories_I } from '../../models/Categories_I';
import { apiGetCategories } from '../../services/category.service';
import { buildCategoryTree } from '../../utils/categories.utils';
import FromParentCategory from '../CategoriesForm/FromParentCategory/FromParentCategory';
import NewCategory from '../CategoriesForm/NewCategory/NewCategory';
import CategoryModalRejection from '../CategoryModalRejection/CategoryModalRejection';
import TreeView from '../TreeView/TreeView';

const Categories = () => {
  // const [categories, setCategories] = useState<Categories_I[]>([]);
  const { refreshTokenHandler, logout } = useAuth();
  const [rejectionModal, setRejectionModal] = useState<boolean>(false);
  const [isRejectionConfirmed, setIsRejectionConfirmed] =
    useState<boolean>(false);
  const [isCategoryChosen, setIsCategoryChosen] = useState<boolean>(false);
  const [parentCategoryId, setParentCategoryId] = useState<string>('');
  const [categoriesTree, setCategoriesTree] = useState<TreeViewCategories_I[]>(
    [],
  );
  const { data: categories, isLoading } = useQuery<Categories_I[]>({
    queryKey: ['categories'],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      await apiGetCategories({ refreshTokenHandler, logout }),
  });

  useEffect(() => {
    const categoriesTree = buildCategoryTree(categories ?? []);
    if (categoriesTree) {
      setCategoriesTree(categoriesTree);
    } else {
      setCategoriesTree([]);
    }
  }, [categories]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumbs title="Categories" route="categories">
        {categories?.length === 0 && (
          <Typography>Please add your first category</Typography>
        )}
        <TreeView
          categoriesTree={categoriesTree}
          isRejectionConfirmed={isRejectionConfirmed}
          setIsRejectionConfirmed={setIsRejectionConfirmed}
          setRejectionModal={setRejectionModal}
          setParentCategoryId={setParentCategoryId}
          setIsCategoryChosen={setIsCategoryChosen}
        />
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <FromParentCategory
            categories={categories ?? []}
            isCategoryChosen={isCategoryChosen}
            parentCategoryId={parentCategoryId}
          />
          <NewCategory parentCategoryId={parentCategoryId} />
        </Box>
        <CategoryModalRejection
          rejectionModal={rejectionModal}
          setIsRejectionConfirmed={setIsRejectionConfirmed}
          setRejectionModal={setRejectionModal}
        />
      </Breadcrumbs>
    </>
  );
};

export default Categories;
