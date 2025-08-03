import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesService } from '../../services/categoriesService';
import axios from 'axios';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const hierarchy = await categoriesService.getHierarchy();
      return hierarchy;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const payload = {
        name: formData.name,
        parentId: formData.parentId ? parseInt(formData.parentId) : 0,
        id: null
      };

      const response = await axios.post('http://localhost:8080/api/categories', payload);
      
      const newCategory = {
        id: response.data.id || Date.now().toString(),
        name: formData.name,
        description: formData.description,
        itemCount: 0,
        sortOrder: formData.sortOrder,
        status: formData.status,
        parentId: formData.parentId,
        children: [],
        isExpanded: false
      };

      return newCategory;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleExpand: (state, action) => {
      const toggleCategoryRecursive = (categories, id) => {
        return categories.map(category => {
          if (category.id === id) {
            return { ...category, isExpanded: !category.isExpanded };
          }
          if (category.children.length > 0) {
            return {
              ...category,
              children: toggleCategoryRecursive(category.children, id)
            };
          }
          return category;
        });
      };
      state.categories = toggleCategoryRecursive(state.categories, action.payload);
    },
    deleteCategory: (state, action) => {
      const deleteCategoryRecursive = (categories, id) => {
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
      state.categories = deleteCategoryRecursive(state.categories, action.payload);
    },
    updateCategory: (state, action) => {
      const { id, updates } = action.payload;
      const updateCategoryRecursive = (categories) => {
        return categories.map(category => {
          if (category.id === id) {
            return { ...category, ...updates };
          }
          if (category.children.length > 0) {
            return {
              ...category,
              children: updateCategoryRecursive(category.children)
            };
          }
          return category;
        });
      };
      state.categories = updateCategoryRecursive(state.categories);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        const addCategoryRecursive = (categories, parentId, newCategory) => {
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
        
        state.categories = addCategoryRecursive(
          state.categories, 
          action.payload.parentId, 
          action.payload
        );
      });
  },
});

export const { setSearchTerm, toggleExpand, deleteCategory, updateCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;