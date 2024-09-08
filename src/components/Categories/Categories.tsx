import { RichTreeView } from '@mui/x-tree-view';
import { useEffect, useState } from 'react';

import { apiGetCategories } from '../../api/category.api';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { useAuthCheck } from '../hooks/useAuthCheck';
import {
  Categories_I,
  CategoryNode,
  TreeViewCategories_I,
} from './Categories_I';

const Categories = () => {
  const [categories, setCategories] = useState<Categories_I[]>([]);
  const [categoriesTree, setCategoriesTree] = useState<TreeViewCategories_I[]>(
    [],
  );
  const { isUserAuthenticated } = useAuthCheck();

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  useEffect(() => {
    apiGetCategories().then((categories) => setCategories(categories));
  }, []);

  useEffect(() => {
    buildCategoryTree();
  }, [categories]);

  const buildCategoryTree = () => {
    const categoryMap: { [key: number]: CategoryNode } = {};

    if (!categories) return;

    categories.forEach((category) => {
      if (category.parent_id === null) {
        categoryMap[category.id] = {
          id: String(category.id),
          label: category.name,
          description: category.description,
          parent_id: category.parent_id,
          children: [],
        };
      } else {
        categoryMap[category.id] = {
          id: String(category.id),
          label: category.name,
          description: category.description,
          parent_id: category.parent_id,
          children: [],
        };
      }
    });

    const categoryTree = [] as TreeViewCategories_I[];

    categories.forEach((category) => {
      if (category.parent_id === null) {
        console.log(categoryMap[category.id]);

        categoryTree.push(categoryMap[category.id]);
      } else {
        const parentCat = categoryMap[category.parent_id];
        // console.log(parentCat);
        parentCat.children.push(categoryMap[category.id]);
      }
    });
    setCategoriesTree(categoryTree);
  };

  const node = [
    {
      id: 1,
      parent_id: null,
      label: 'electrical',
      description: 'electrical description',
      children: [],
    },
    {
      id: 3,
      parent_id: null,
      label: 'vapes',
      description: 'vapes description',
      children: [
        {
          id: 4,
          parent_id: '3',
          label: 'vapes mods',
          description: 'vapes mods description',
          children: [],
        },
      ],
    },
  ];

  // console.log(categoriesTree);
  return (
    <>
      <Breadcrumbs title="Categories" route="categories">
        <RichTreeView items={categoriesTree} />
      </Breadcrumbs>
    </>
  );
};

export default Categories;
