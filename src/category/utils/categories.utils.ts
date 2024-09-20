import {
  Categories_I,
  CategoryNode,
  TreeViewCategories_I,
} from '../models/Categories_I';

export const buildCategoryTree = (
  categories: Categories_I[],
): TreeViewCategories_I[] => {
  const categoryMap: { [key: number]: CategoryNode } = {};

  if (categories.length === 0) return [];

  categories.forEach((category) => {
    categoryMap[category.id!] = {
      id: String(category.id),
      label: category.name,
      description: category.description,
      iconName: category.iconName ?? '',
      iconPath: category.iconPath ?? '',
      parent_id: category.parent_id ? String(category.parent_id) : null,
      children: [],
    };
  });

  const categoryTree: TreeViewCategories_I[] = [];

  categories.forEach((category) => {
    const node = categoryMap[category.id!];
    if (node) {
      if (category.parent_id === null) {
        categoryTree.push(node);
      } else {
        const parentNode = categoryMap[category.parent_id];
        if (parentNode) {
          parentNode.children.push(node);
        } else {
          console.warn(
            `Категория с ID ${category.id} ссылается на несуществующего родителя с ID ${category.parent_id}`,
          );
        }
      }
    }
  });

  return categoryTree;
};

export const findIconNameById = (
  tree: TreeViewCategories_I[],
  id: number,
): string | undefined => {
  for (const item of tree) {
    if (+item.id === id) {
      return item.iconName;
    }

    if (item.children.length) {
      const icon = findIconNameById(item.children, id);
      if (icon) {
        return icon;
      }
    }
  }
  return undefined;
};

export const findIconPathById = (
  tree: TreeViewCategories_I[],
  id: number,
): string | undefined => {
  for (const item of tree) {
    if (+item.id === id) {
      return item.iconPath;
    }

    if (item.children.length) {
      const icon = findIconPathById(item.children, id);
      if (icon) {
        return icon;
      }
    }
  }
  return undefined;
};
