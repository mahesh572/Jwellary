import React, { useState } from 'react';
import { Plus, Edit, Trash2, Settings, Link, Unlink, Tag } from 'lucide-react';
import { categoriesService, CategoryFlat } from '../../../services/categoriesService';

interface Option {
  id: string;
  name: string;
  type: 'select' | 'radio' | 'checkbox' | 'text';
  values: string[];
  required: boolean;
  sortOrder: number;
  categories: string[]; // Array of category IDs this option applies to
}

const ProductOptions: React.FC = () => {
  const [availableCategories, setAvailableCategories] = useState<CategoryFlat[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const hierarchy = await categoriesService.getHierarchy();
        const flatCategories = categoriesService.flattenCategories(hierarchy);
        setAvailableCategories(flatCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const [options, setOptions] = useState<Option[]>([
    {
      id: '1',
      name: 'Ring Size',
      type: 'select',
      values: ['5', '6', '7', '8', '9', '10', '11', '12'],
      required: true,
      sortOrder: 1,
      categories: ['1'], // Only for Rings
    },
    {
      id: '2',
      name: 'Metal Type',
      type: 'radio',
      values: ['Gold', 'Silver', 'Platinum', 'Rose Gold'],
      required: true,
      sortOrder: 2,
      categories: ['1', '2', '3', '4'], // For multiple categories
    },
    {
      id: '3',
      name: 'Engraving',
      type: 'text',
      values: [],
      required: false,
      sortOrder: 3,
      categories: [], // Available for all categories
    },
    {
      id: '4',
      name: 'Gift Wrapping',
      type: 'checkbox',
      values: ['Standard Box', 'Premium Box', 'Gift Bag'],
      required: false,
      sortOrder: 4,
      categories: [], // Available for all categories
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingOption, setEditingOption] = useState<Option | null>(null);
  const [mappingOption, setMappingOption] = useState<Option | null>(null);
  const [newOption, setNewOption] = useState<Partial<Option>>({
    name: '',
    type: 'select',
    values: [],
    required: false,
    categories: [],
  });

  const handleAddOption = () => {
    if (newOption.name) {
      const option: Option = {
        id: Date.now().toString(),
        name: newOption.name,
        type: newOption.type || 'select',
        values: newOption.values || [],
        required: newOption.required || false,
        sortOrder: options.length + 1,
        categories: newOption.categories || [],
      };
      setOptions([...options, option]);
      setNewOption({ name: '', type: 'select', values: [], required: false, categories: [] });
      setShowAddModal(false);
    }
  };

  const handleDeleteOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const addValue = (optionId: string, value: string) => {
    setOptions(options.map(option => 
      option.id === optionId 
        ? { ...option, values: [...option.values, value] }
        : option
    ));
  };

  const removeValue = (optionId: string, valueIndex: number) => {
    setOptions(options.map(option => 
      option.id === optionId 
        ? { ...option, values: option.values.filter((_, i) => i !== valueIndex) }
        : option
    ));
  };

  const handleCategoryMapping = (optionId: string, categoryIds: string[]) => {
    setOptions(options.map(option => 
      option.id === optionId 
        ? { ...option, categories: categoryIds }
        : option
    ));
    setShowCategoryModal(false);
    setMappingOption(null);
  };

  const getCategoryName = (categoryId: string) => {
    const category = availableCategories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const mockCategories = [
    { id: '1', name: 'Rings' },
    { id: '2', name: 'Necklaces' },
    { id: '3', name: 'Bracelets' },
    { id: '4', name: 'Earrings' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">Product Options</h1>
          <p className="text-slate-600">Manage product customization options</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Option</span>
        </button>
      </div>

      {/* Options List */}
      <div className="space-y-6">
        {options.map((option) => (
          <div key={option.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{option.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    option.type === 'select' ? 'bg-blue-100 text-blue-800' :
                    option.type === 'radio' ? 'bg-green-100 text-green-800' :
                    option.type === 'checkbox' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {option.type}
                  </span>
                  {option.required && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      Required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setMappingOption(option);
                    setShowCategoryModal(true);
                  }}
                  className="p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Manage Categories"
                >
                  <Link size={16} />
                </button>
                <button
                  onClick={() => setEditingOption(option)}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteOption(option.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Category Mapping Display */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Applied to Categories:</h4>
              {option.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {option.categories.map((categoryId) => (
                    <span
                      key={categoryId}
                      className="inline-flex items-center px-3 py-1 text-sm bg-primary-100 text-primary-800 rounded-full"
                    >
                      <Tag size={12} className="mr-1" />
                      {getCategoryName(categoryId)}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-slate-500 italic">Available for all categories</span>
              )}
            </div>

            {option.type !== 'text' && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">Values:</h4>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full group hover:bg-slate-200 transition-colors"
                    >
                      {value}
                      <button
                        onClick={() => removeValue(option.id, index)}
                        className="ml-2 text-slate-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {option.type === 'text' && (
              <div className="text-sm text-slate-600">
                Text input field for custom values
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Option Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Add New Option</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Option Name
                </label>
                <input
                  type="text"
                  value={newOption.name || ''}
                  onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                  className="input-elegant"
                  placeholder="e.g., Ring Size, Metal Type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Option Type
                </label>
                <select
                  value={newOption.type || 'select'}
                  onChange={(e) => setNewOption({ ...newOption, type: e.target.value as Option['type'] })}
                  className="input-elegant"
                >
                  <option value="select">Dropdown Select</option>
                  <option value="radio">Radio Buttons</option>
                  <option value="checkbox">Checkboxes</option>
                  <option value="text">Text Input</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="required"
                  checked={newOption.required || false}
                  onChange={(e) => setNewOption({ ...newOption, required: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                />
                <label htmlFor="required" className="ml-2 text-sm text-slate-700">
                  Required field
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Apply to Categories (leave empty for all)
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {mockCategories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cat-${category.id}`}
                        checked={newOption.categories?.includes(category.id) || false}
                        onChange={(e) => {
                          const currentCategories = newOption.categories || [];
                          if (e.target.checked) {
                            setNewOption({ 
                              ...newOption, 
                              categories: [...currentCategories, category.id] 
                            });
                          } else {
                            setNewOption({ 
                              ...newOption, 
                              categories: currentCategories.filter(id => id !== category.id) 
                            });
                          }
                        }}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                      />
                      <label htmlFor={`cat-${category.id}`} className="ml-2 text-sm text-slate-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOption}
                className="btn-primary"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Mapping Modal */}
      {showCategoryModal && mappingOption && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Manage Categories for "{mappingOption.name}"
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Select which categories this option should be available for. Leave all unchecked to make it available for all categories.
              </p>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {loadingCategories ? (
                  <div className="text-sm text-slate-500 p-3">Loading categories...</div>
                ) : (
                  availableCategories.map(category => (
                    <div key={category.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mapping-${category.id}`}
                          checked={mappingOption.categories.includes(category.id)}
                          onChange={(e) => {
                            const updatedCategories = e.target.checked
                              ? [...mappingOption.categories, category.id]
                              : mappingOption.categories.filter(id => id !== category.id);
                            setMappingOption({ ...mappingOption, categories: updatedCategories });
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                        />
                        <label htmlFor={`mapping-${category.id}`} className="ml-3 text-sm font-medium text-slate-700">
                          {category.name}
                        </label>
                      </div>
                      <span className="text-xs text-slate-500">
                        Products
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setMappingOption(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCategoryMapping(mappingOption.id, mappingOption.categories)}
                className="btn-primary"
              >
                Save Mapping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Options Settings */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-800">Global Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Default Option Display
            </label>
            <select className="input-elegant">
              <option>Show all options expanded</option>
              <option>Show options collapsed</option>
              <option>Show required options only</option>
              <option>Show by category</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Option Validation
            </label>
            <select className="input-elegant">
              <option>Validate on selection</option>
              <option>Validate on form submit</option>
              <option>No validation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category-specific Options
            </label>
            <select className="input-elegant">
              <option>Show mapped options only</option>
              <option>Show all options + mapped</option>
              <option>Hide unmapped options</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button className="btn-primary">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;