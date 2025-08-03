import React from 'react';
import { Plus, Trash2, Copy } from 'lucide-react';

interface VariantsTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
  categoryOptions: any[];
  validationErrors: Record<string, string>;
}

const VariantsTab: React.FC<VariantsTabProps> = ({
  formData,
  updateFormData,
  categoryOptions,
  validationErrors
}) => {
  const addVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      name: '',
      price: formData.basePrice || '',
      stock: '0',
      sku: '',
      options: {}
    };

    updateFormData({
      variants: [...formData.variants, newVariant]
    });
  };

  const removeVariant = (index: number) => {
    const updatedVariants = formData.variants.filter((_: any, i: number) => i !== index);
    updateFormData({ variants: updatedVariants });
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const updatedVariants = formData.variants.map((variant: any, i: number) => 
      i === index ? { ...variant, [field]: value } : variant
    );
    updateFormData({ variants: updatedVariants });
  };

  const updateVariantOption = (index: number, optionId: string, value: string) => {
    const updatedVariants = formData.variants.map((variant: any, i: number) => 
      i === index 
        ? { ...variant, options: { ...variant.options, [optionId]: value } }
        : variant
    );
    updateFormData({ variants: updatedVariants });
  };

  const duplicateVariant = (index: number) => {
    const variantToDuplicate = formData.variants[index];
    const duplicatedVariant = {
      ...variantToDuplicate,
      id: Date.now().toString(),
      name: `${variantToDuplicate.name} (Copy)`,
      sku: `${variantToDuplicate.sku}-copy`
    };

    updateFormData({
      variants: [...formData.variants, duplicatedVariant]
    });
  };

  const generateSKU = (index: number) => {
    const variant = formData.variants[index];
    const baseName = formData.name.replace(/\s+/g, '-').toLowerCase();
    const optionValues = Object.values(variant.options).join('-').replace(/\s+/g, '-').toLowerCase();
    const sku = `${baseName}-${optionValues}-${Date.now().toString().slice(-4)}`;
    
    updateVariant(index, 'sku', sku);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Product Variants</h2>
        <p className="text-slate-600 mb-6">
          Create different variations of your product with specific options, pricing, and inventory
        </p>
      </div>

      {validationErrors.variants && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {validationErrors.variants}
        </div>
      )}

      {/* Add Variant Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">
          Variants ({formData.variants.length})
        </h3>
        <button
          onClick={addVariant}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Variant</span>
        </button>
      </div>

      {/* Variants List */}
      <div className="space-y-4">
        {formData.variants.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl">
            <div className="text-slate-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">No variants created yet</h3>
            <p className="text-slate-500 mb-4">
              Create variants to offer different options like sizes, colors, or materials
            </p>
            <button
              onClick={addVariant}
              className="btn-primary"
            >
              Create First Variant
            </button>
          </div>
        ) : (
          formData.variants.map((variant: any, index: number) => (
            <div key={variant.id} className="border border-slate-200 rounded-xl p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-slate-800">
                  Variant {index + 1}
                </h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => duplicateVariant(index)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Duplicate variant"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => removeVariant(index)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove variant"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Variant Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Variant Name *
                  </label>
                  <input
                    type="text"
                    value={variant.name}
                    onChange={(e) => updateVariant(index, 'name', e.target.value)}
                    className={`input-elegant ${validationErrors[`variant_${index}_name`] ? 'border-red-500' : ''}`}
                    placeholder="e.g., Gold Ring Size 7"
                  />
                  {validationErrors[`variant_${index}_name`] && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors[`variant_${index}_name`]}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', e.target.value)}
                      className={`input-elegant pl-8 ${validationErrors[`variant_${index}_price`] ? 'border-red-500' : ''}`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  {validationErrors[`variant_${index}_price`] && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors[`variant_${index}_price`]}</p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={variant.stock}
                    onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                    className={`input-elegant ${validationErrors[`variant_${index}_stock`] ? 'border-red-500' : ''}`}
                    placeholder="0"
                    min="0"
                  />
                  {validationErrors[`variant_${index}_stock`] && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors[`variant_${index}_stock`]}</p>
                  )}
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    SKU
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      className="input-elegant rounded-r-none"
                      placeholder="Product SKU"
                    />
                    <button
                      onClick={() => generateSKU(index)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-l-0 border-slate-300 rounded-r-xl text-sm text-slate-600 transition-colors"
                      title="Generate SKU"
                    >
                      Auto
                    </button>
                  </div>
                </div>
              </div>

              {/* Variant Options */}
              {categoryOptions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h5 className="text-sm font-medium text-slate-700 mb-3">Variant Options</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryOptions.map(option => (
                      <div key={option.id}>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {option.name}
                        </label>
                        <select
                          value={variant.options[option.id] || ''}
                          onChange={(e) => updateVariantOption(index, option.id, e.target.value)}
                          className="input-elegant"
                        >
                          <option value="">Select {option.name.toLowerCase()}</option>
                          {option.values.map((value: string) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Bulk Actions */}
      {formData.variants.length > 0 && (
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Bulk Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const updatedVariants = formData.variants.map((variant: any) => ({
                  ...variant,
                  price: formData.basePrice
                }));
                updateFormData({ variants: updatedVariants });
              }}
              className="btn-secondary text-sm"
            >
              Set All Prices to Base Price
            </button>
            <button
              onClick={() => {
                const updatedVariants = formData.variants.map((variant: any, index: number) => ({
                  ...variant,
                  sku: `${formData.name.replace(/\s+/g, '-').toLowerCase()}-${index + 1}`
                }));
                updateFormData({ variants: updatedVariants });
              }}
              className="btn-secondary text-sm"
            >
              Auto-Generate All SKUs
            </button>
            <button
              onClick={() => {
                const updatedVariants = formData.variants.map((variant: any) => ({
                  ...variant,
                  stock: '10'
                }));
                updateFormData({ variants: updatedVariants });
              }}
              className="btn-secondary text-sm"
            >
              Set All Stock to 10
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantsTab;