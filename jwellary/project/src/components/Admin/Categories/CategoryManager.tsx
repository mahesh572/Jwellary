import React, { useState } from 'react';
import { Search, Plus, Folder, FolderTree } from 'lucide-react';
import { useCategories } from '../../../hooks/useCategories';
import { CategoryCard } from './CategoryCard';
import { CategoryModal } from './CategoryModal';
import { Category } from '../../../types/Category';

export const CategoryManager: React.FC = () => {
  const {
    categories,
    searchTerm,
    setSearchTerm,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleExpand
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentForNewSub, setParentForNewSub] = useState<Category | null>(null);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setParentForNewSub(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setParentForNewSub(null);
    setIsModalOpen(true);
  };

  const handleAddSubcategory = (parentCategory: Category) => {
    setEditingCategory(null);
    setParentForNewSub(parentCategory);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: any) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setParentForNewSub(null);
  };

  const totalCategories = categories.reduce((count, cat) => {
    const countChildren = (category: Category): number => {
      return 1 + category.children.reduce((sum, child) => sum + countChildren(child), 0);
    };
    return count + countChildren(cat);
  }, 0);

  const totalItems = categories.reduce((sum, cat) => {
    const sumItems = (category: Category): number => {
      return category.itemCount + category.children.reduce((childSum, child) => childSum + sumItems(child), 0);
    };
    return sum + sumItems(cat);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FolderTree className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
          </div>
          <p className="text-gray-600">
            Organize your products with hierarchical categories and subcategories
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Folder className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
                <p className="text-sm text-gray-600">Total Categories</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <FolderTree className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.reduce((count, cat) => count + cat.children.length, 0)}
                </p>
                <p className="text-sm text-gray-600">Subcategories</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  #
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-4">
          {categories.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FolderTree className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No categories found' : 'No categories yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Create your first category to get started organizing your products'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={handleAddCategory}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus size={20} />
                  Add First Category
                </button>
              )}
            </div>
          ) : (
            categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                level={0}
                onToggleExpand={toggleExpand}
                onEdit={handleEditCategory}
                onDelete={deleteCategory}
                onAddSubcategory={handleAddSubcategory}
              />
            ))
          )}
        </div>

        {/* Modal */}
        <CategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          category={editingCategory}
          parentCategory={parentForNewSub}
          allCategories={categories}
        />
      </div>
    </div>
  );
};