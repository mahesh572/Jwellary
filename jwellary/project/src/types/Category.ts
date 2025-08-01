export interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  sortOrder: number;
  status: 'active' | 'inactive';
  parentId: string | null;
  children: Category[];
  isExpanded?: boolean;
}

export interface CategoryFormData {
  name: string;
  description: string;
  sortOrder: number;
  status: 'active' | 'inactive';
  parentId: string | null;
}