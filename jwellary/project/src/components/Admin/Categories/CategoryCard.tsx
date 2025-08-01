import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Edit2, Trash2, Plus } from 'lucide-react';
import { Category } from '../../../types/Category';

interface CategoryCardProps {
  category: Category;
  level: number;
  onToggleExpand: (id: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onAddSubcategory: (parentCategory: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  level,
  onToggleExpand,
  onEdit,
  onDelete,
  onAddSubcategory
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    if (category.children.length > 0) {
      alert('Cannot delete category with subcategories. Please remove subcategories first.');
      return;
    }
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(category.id);
    setShowDeleteConfirm(false);
  };

  const hasChildren = category.children.length > 0;
  const isExpanded = category.isExpanded || false;

  return (
    <div className="relative">
      {/* Connecting Lines */}
      {level > 0 && (
        <>
          <div className="absolute left-4 top-0 w-px h-4 bg-gray-300"></div>
          <div className="absolute left-4 top-4 w-4 h-px bg-gray-300"></div>
        </>
      )}

      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ${
        level > 0 ? 'ml-8' : ''
      }`}>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                {/* Expand/Collapse Button */}
                {hasChildren ? (
                  <button
                    onClick={() => onToggleExpand(category.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 -m-1"
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                ) : (
                  <div className="w-4"></div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {category.name}
                    </h3>
                    
                    {/* Status Badge */}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      category.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status}
                    </span>

                    {/* Category Type Badge */}
                    {level > 0 && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        Subcategory
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {category.itemCount} items
                    </span>
                    <span>Order: {category.sortOrder}</span>
                    {hasChildren && (
                      <span>{category.children.length} subcategories</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-4">
              {/* Add Subcategory Button */}
              <button
                onClick={() => onAddSubcategory(category)}
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                title="Add Subcategory"
              >
                <Plus size={16} />
              </button>

              {/* Edit Button */}
              <button
                onClick={() => onEdit(category)}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit Category"
              >
                <Edit2 size={16} />
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDeleteClick}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Category"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-white bg-opacity-95 rounded-lg flex items-center justify-center border border-red-200">
            <div className="text-center p-4">
              <p className="text-sm text-gray-700 mb-3">
                Are you sure you want to delete "{category.name}"?
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Render Children */}
      {hasChildren && isExpanded && (
        <div className="mt-3 space-y-3">
          {category.children.map((child) => (
            <CategoryCard
              key={child.id}
              category={child}
              level={level + 1}
              onToggleExpand={onToggleExpand}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddSubcategory={onAddSubcategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};