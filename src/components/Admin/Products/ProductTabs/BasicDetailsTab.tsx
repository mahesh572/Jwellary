import React from 'react';
import { mockCategories } from '../../../../data/mockData';

interface BasicDetailsTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
  categoryOptions: any[];
  validationErrors: Record<string, string>;
}

const BasicDetailsTab: React.FC<BasicDetailsTabProps> = ({
  formData,
  updateFormData,
  categoryOptions,
  validationErrors
}) => {
  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleOptionChange = (optionId: string, value: string) => {
    updateFormData({
      selectedOptions: {
        ...formData.selectedOptions,
        [optionId]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Basic Product Information</h2>
        <p className="text-slate-600 mb-6">Enter the fundamental details about your product</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`input-elegant ${validationErrors.name ? 'border-red-500' : ''}`}
            placeholder="Enter product name"
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className={`input-elegant ${validationErrors.description ? 'border-red-500' : ''}`}
            placeholder="Enter detailed product description"
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
          )}
        </div>

        {/* Base Price */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Base Price *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
            <input
              type="number"
              value={formData.basePrice}
              onChange={(e) => handleInputChange('basePrice', e.target.value)}
              className={`input-elegant pl-8 ${validationErrors.basePrice ? 'border-red-500' : ''}`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
          {validationErrors.basePrice && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.basePrice}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`input-elegant ${validationErrors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Select a category</option>
            {mockCategories.map(category => (
              <option key={category.id} value={category.name.toLowerCase()}>
                {category.name}
              </option>
            ))}
          </select>
          {validationErrors.category && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
          )}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Additional Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-700">In Stock</label>
              <p className="text-xs text-slate-500">Product is available for purchase</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => updateFormData({ inStock: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-700">Featured Product</label>
              <p className="text-xs text-slate-500">Show in featured collections</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => updateFormData({ featured: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsTab;