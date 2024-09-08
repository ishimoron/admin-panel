export interface Categories_I {
  id: number;
  parent_id: number;
  name: string;
  description: string;
}

export interface TreeViewCategories_I {
  id: string;
  parent_id: null | number;
  label: string;
  description: string;
  children: TreeViewCategories_I[];
}

export interface CategoryNode extends TreeViewCategories_I {
  children: TreeViewCategories_I[];
}
