import Button from '@mui/material/Button';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useEffect, useState } from 'react';

import { apiGetCategories } from '../../api/category.api';
import Sidebar from '../Sidebar/Sidebar';
import { useAuthCheck } from '../hooks/useAuthCheck';
import { Categories_I, CategoryNode } from './Categories_I';

const Categories = () => {
  const [categories, setCategories] = useState<Categories_I[]>([]);
  const [categoriesTree, setCategoriesTree] = useState<Categories_I[]>([]);
  const { isUserAuthenticated } = useAuthCheck();
  useEffect(() => {
    isUserAuthenticated();
    apiGetCategories().then((categories) => setCategories(categories));
  }, []);

  useEffect(() => {
    buildCategoryTree();
  }, [categories]);

  const buildCategoryTree = () => {
    const categoryMap: { [key: number]: CategoryNode } = {};

    categories.forEach((category) => {
      if (category.parent_id === null) {
        categoryMap[category.id] = { ...category, subcategories: [] };
      } else {
        categoryMap[category.id] = {
          ...category,
          subcategories: [],
        };
      }
    });

    const categoryTree = [] as Categories_I[];

    categories.forEach((category) => {
      if (category.parent_id === null) {
        categoryTree.push(categoryMap[category.id]);
      } else {
        const parentCat = categoryMap[category.parent_id];
        parentCat.subcategories.push(categoryMap[category.id]);
      }
    });
    setCategoriesTree(categoryTree);
  };
  // const node = [
  //   {
  //     label: 'Argentina',
  //     description: '1212',
  //     expanded: true,
  //     children: [
  //       {
  //         label: 'Argentina',
  //         expanded: true,
  //         children: [
  //           {
  //             label: 'Argentina',
  //           },
  //           {
  //             label: 'Croatia',
  //           },
  //         ],
  //       },
  //       {
  //         label: 'France',
  //         expanded: true,
  //         children: [
  //           {
  //             label: 'France',
  //           },
  //           {
  //             label: 'Morocco',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
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

  console.log(categoriesTree);
  return (
    <div>
      <Sidebar></Sidebar>
      {/* <OrganizationChart value={node} nodeTemplate={nodeTemplate} />
       */}
      {/* <Tree value={node} /> */}
      <Button variant="contained">Hello world</Button>;
      <RichTreeView items={node} />
    </div>
  );
};

export default Categories;
