export interface Categories_I {
  id?: number;
  parent_id: null | number;
  name: string;
  description: string;
  iconName?: string;
  iconPath?: string;
}

export interface CategoryFromParent extends Categories_I {
  parent_id: number;
}

export interface TreeViewCategories_I {
  id: string;
  parent_id: null | string;
  label: string;
  description: string;
  iconName: string;
  iconPath: string;
  children: TreeViewCategories_I[];
}

export interface CategoryNode extends TreeViewCategories_I {
  children: TreeViewCategories_I[];
}
