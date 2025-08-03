export interface CategoryHierarchy {
  id: number;
  name: string;
  parentId: number | null;
  children: CategoryHierarchy[];
}

export interface CategoryFlat {
  id: string;
  name: string;
  parentId: string | null;
}

class CategoriesService {
  private baseUrl = 'http://localhost:8090/api/categories';

  async getHierarchy(): Promise<CategoryHierarchy[]> {
    try {
      const response = await fetch(`${this.baseUrl}/hierarchy`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      // API returns single object, but we need array for consistency
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Convert hierarchical structure to flat array for dropdowns
  flattenCategories(categories: CategoryHierarchy[]): CategoryFlat[] {
    const result: CategoryFlat[] = [];
    
    const flatten = (cats: CategoryHierarchy[], level = 0) => {
      cats.forEach(cat => {
        result.push({
          id: cat.id.toString(),
          name: '  '.repeat(level) + cat.name,
          parentId: cat.parentId?.toString() || null
        });
        if (cat.children.length > 0) {
          flatten(cat.children, level + 1);
        }
      });
    };
    
    flatten(categories);
    return result;
  }

  // Get only top-level categories
  getTopLevelCategories(categories: CategoryHierarchy[]): CategoryFlat[] {
    return categories.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      parentId: null
    }));
  }
}

export const categoriesService = new CategoriesService();