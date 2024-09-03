export interface Categories_I {
  id: number;
  parent_id: number;
  name: string;
  description: string;
}

export interface CategoryNode extends Categories_I {
  subcategories: Categories_I[];
}
