import { useState, useCallback } from 'react';
import { Category, CategoryFormData } from '../types/Category';


// Sample data with hierarchical structure
const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Rings',
    description: 'Beautiful rings for every occasion',
    itemCount: 45,
    sortOrder: 1,
    status: 'active',
    parentId: null,
    children: [
      {
        id: '1-1',
        name: 'Engagement Rings',
        description: 'Diamond and gemstone engagement rings',
        itemCount: 25,
        sortOrder: 1,
        status: 'active',
        parentId: '1',
        children: []
      },
      {
        id: '1-2',
        name: 'Wedding Bands',
        description: 'Classic and modern wedding bands',
        itemCount: 20,
        sortOrder: 2,
        status: 'active',
        parentId: '1',
        children: []
      }
    ]
  },
  {
    id: '2',
    name: 'Necklaces',
    description: 'Elegant necklaces and chains',
    itemCount: 32,
    sortOrder: 2,
    status: 'active',
    parentId: null,
    children: [
      {
        id: '2-1',
        name: 'Pendant Necklaces',
        description: 'Necklaces with beautiful pendants',
        itemCount: 18,
        sortOrder: 1,
        status: 'active',
        parentId: '2',
        children: []
      }
    ]
  },
  {
    id: '3',
    name: 'Earrings',
    description: 'Stunning earrings for every style',
    itemCount: 28,
    sortOrder: 3,
    status: 'active',
    parentId: null,
    children: []
  },
  {
    id: '4',
    name: 'Bracelets',
    description: 'Elegant bracelets and bangles',
    itemCount: 19,
    sortOrder: 4,
    status: 'active',
    parentId: null,
    children: []
  },
  {
    id: '5',
    name: 'Watches',
    description: 'Luxury watches and timepieces',
    itemCount: 15,
    sortOrder: 5,
    status: 'active',
    parentId: null,
    children: []
  }
];

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const updateCategoryRecursive = (categories: Category[], id: string, updates: Partial<Category>): Category[] => {
    return categories.map(category => {
      if (category.id === id) {
        return { ...category, ...updates };
      }
      if (category.children.length > 0) {
        return {
          ...category,
          children: updateCategoryRecursive(category.children, id, updates)
        };
      }
      return category;
    });
  };

  const deleteCategoryRecursive = (categories: Category[], id: string): Category[] => {
    return categories.filter(category => {
      if (category.id === id) {
        return false;
      }
      if (category.children.length > 0) {
        category.children = deleteCategoryRecursive(category.children, id);
      }
      return true;
    });
  };

  const addCategoryRecursive = (categories: Category[], parentId: string | null, newCategory: Category): Category[] => {
    if (parentId === null) {
      return [...categories, newCategory];
    }
    
    return categories.map(category => {
      if (category.id === parentId) {
        return {
          ...category,
          children: [...category.children, newCategory]
        };
      }
      if (category.children.length > 0) {
        return {
          ...category,
          children: addCategoryRecursive(category.children, parentId, newCategory)
        };
      }
      return category;
    });
  };

  const toggleExpand = useCallback((id: string) => {
    setCategories(prev => updateCategoryRecursive(prev, id, { isExpanded: !prev.find(c => c.id === id)?.isExpanded }));
  }, []);

  const addCategory = useCallback((formData: CategoryFormData) => {
    // Prepare API payload
    const payload = {
      name: formData.name,
      parentId: formData.parentId ? parseInt(formData.parentId) : 0,
      id: null
    };

    // Call API
    fetch('http://localhost:8080/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create category');
      }
      return response.json();
    })
    .then(data => {
      console.log('Category created successfully:', data);
      
      // Create local category object with server response
      const newCategory: Category = {
        id: data.id || generateId(),
        name: formData.name,
        description: formData.description,
        itemCount: 0,
        sortOrder: formData.sortOrder,
        status: formData.status,
        parentId: formData.parentId,
        children: [],
        isExpanded: false
      };

      setCategories(prev => addCategoryRecursive(prev, formData.parentId, newCategory));
    })
    .catch(error => {
      console.error('Error creating category:', error);
      alert('Failed to create category. Please try again.');
    });
  }, []);

  const updateCategory = useCallback((id: string, formData: CategoryFormData) => {
    setCategories(prev => updateCategoryRecursive(prev, id, {
      name: formData.name,
      description: formData.description,
      sortOrder: formData.sortOrder,
      status: formData.status,
      parentId: formData.parentId
    }));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => deleteCategoryRecursive(prev, id));
  }, []);

  const filterCategoriesRecursive = (categories: Category[], term: string): Category[] => {
    if (!term) return categories;
    
    return categories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(term.toLowerCase()) ||
                           category.description.toLowerCase().includes(term.toLowerCase());
      const hasMatchingChildren = category.children.some(child => 
        filterCategoriesRecursive([child], term).length > 0
      );
      
      return matchesSearch || hasMatchingChildren;
    }).map(category => ({
      ...category,
      children: filterCategoriesRecursive(category.children, term)
    }));
  };

  const filteredCategories = filterCategoriesRecursive(categories, searchTerm);

  return {
    categories: filteredCategories,
    searchTerm,
    setSearchTerm,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleExpand
  };
};