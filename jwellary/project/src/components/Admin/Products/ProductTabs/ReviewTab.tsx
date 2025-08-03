import React from 'react';
import { Check, AlertCircle, Image as ImageIcon, Package, Tag, DollarSign } from 'lucide-react';

interface ReviewTabProps {
  formData: any;
  categoryOptions: any[];
}

const ReviewTab: React.FC<ReviewTabProps> = ({ formData, categoryOptions }) => {
  const getOptionName = (optionId: string) => {
    const option = categoryOptions.find(opt => opt.id === optionId);
    return option ? option.name : optionId;
  };

  const totalVariants = formData.variants.length;
  const totalStock = formData.variants.reduce((sum: number, variant: any) => sum + parseInt(variant.stock || '0'), 0);
  const priceRange = formData.variants.length > 0 
    ? {
        min: Math.min(...formData.variants.map((v: any) => parseFloat(v.price || '0'))),
        max: Math.max(...formData.variants.map((v: any) => parseFloat(v.price || '0')))
      }
    : { min: parseFloat(formData.basePrice || '0'), max: parseFloat(formData.basePrice || '0') };

  const completionChecks = [
    {
      label: 'Basic Details',
      completed: formData.name && formData.description && formData.basePrice && formData.category,
      items: [
        { label: 'Product Name', completed: !!formData.name },
        { label: 'Description', completed: !!formData.description },
        { label: 'Base Price', completed: !!formData.basePrice },
        { label: 'Category', completed: !!formData.category },
      ]
    },
    {
      label: 'Variants',
      completed: formData.variants.length > 0,
      items: [
        { label: 'At least one variant', completed: formData.variants.length > 0 },
        { label: 'All variants have names', completed: formData.variants.every((v: any) => v.name) },
        { label: 'All variants have prices', completed: formData.variants.every((v: any) => v.price) },
        { label: 'All variants have stock', completed: formData.variants.every((v: any) => v.stock !== '') },
      ]
    },
    {
      label: 'Media',
      completed: formData.images.length > 0,
      items: [
        { label: 'At least one image', completed: formData.images.length > 0 },
        { label: 'Main image selected', completed: formData.images.length > 0 },
      ]
    }
  ];

  const overallCompletion = completionChecks.every(check => check.completed);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Review & Confirm</h2>
        <p className="text-slate-600 mb-6">
          Review all product details before creating the product. Make sure everything is correct.
        </p>
      </div>

      {/* Completion Status */}
      <div className="card p-6 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Completion Status</h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            overallCompletion 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {overallCompletion ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{overallCompletion ? 'Ready to Create' : 'Incomplete'}</span>
          </div>
        </div>

        <div className="space-y-3">
          {completionChecks.map((check, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`flex items-center justify-center w-6 h-6 rounded-full text-sm ${
                check.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-slate-300 text-slate-600'
              }`}>
                {check.completed ? <Check size={14} /> : index + 1}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${check.completed ? 'text-green-800' : 'text-slate-700'}`}>
                  {check.label}
                </p>
                <div className="mt-1 space-y-1">
                  {check.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        item.completed ? 'bg-green-500' : 'bg-slate-300'
                      }`} />
                      <span className={item.completed ? 'text-green-700' : 'text-slate-600'}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-600">Product Name</label>
              <p className="text-slate-800 font-medium">{formData.name || 'Not specified'}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Category</label>
              <p className="text-slate-800 capitalize">{formData.category || 'Not specified'}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Base Price</label>
              <p className="text-slate-800 font-medium">
                {formData.basePrice ? `$${parseFloat(formData.basePrice).toFixed(2)}` : 'Not specified'}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Description</label>
              <p className="text-slate-800 text-sm line-clamp-3">
                {formData.description || 'No description provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-800">Product Statistics</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-800">{totalVariants}</p>
              <p className="text-sm text-slate-600">Variants</p>
            </div>
            
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-800">{totalStock}</p>
              <p className="text-sm text-slate-600">Total Stock</p>
            </div>
            
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-800">{formData.images.length}</p>
              <p className="text-sm text-slate-600">Images</p>
            </div>
            
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-800">{formData.videos.length}</p>
              <p className="text-sm text-slate-600">Videos</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800 mb-1">Price Range</p>
            <p className="text-lg font-bold text-green-700">
              {priceRange.min === priceRange.max 
                ? `$${priceRange.min.toFixed(2)}`
                : `$${priceRange.min.toFixed(2)} - $${priceRange.max.toFixed(2)}`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Variants Preview */}
      {formData.variants.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-800">Variants Summary</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">SKU</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {formData.variants.map((variant: any, index: number) => (
                  <tr key={variant.id}>
                    <td className="px-4 py-3 text-sm text-slate-800">{variant.name}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">
                      ${parseFloat(variant.price || '0').toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-800">{variant.stock}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{variant.sku || 'Auto-generated'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Media Preview */}
      {formData.images.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ImageIcon className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Media Preview</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {formData.images.map((image: string, index: number) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg border border-slate-200"
                />
                {index === 0 && (
                  <div className="absolute top-1 left-1 bg-primary-500 text-white text-xs px-1 py-0.5 rounded">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Notes */}
      <div className="card p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready to Create Product?</h3>
        <p className="text-blue-700 text-sm mb-4">
          Once you create this product, it will be added to your inventory and can be viewed by customers 
          {formData.inStock ? ' immediately' : ' once you mark it as in stock'}.
        </p>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${formData.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-slate-700">
              {formData.inStock ? 'Will be available for purchase' : 'Will be marked as out of stock'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${formData.featured ? 'bg-yellow-500' : 'bg-slate-400'}`} />
            <span className="text-slate-700">
              {formData.featured ? 'Will appear in featured collections' : 'Regular product listing'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTab;