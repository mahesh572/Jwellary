import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Save, X, Upload, Image as ImageIcon, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddCategory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get('parent');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    parentId: parentId || '',
    sortOrder: 1,
    isActive: true,
    metaTitle: '',
    metaDescription: '',
    showOnHomepage: false,
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const parentCategories = [
    { id: '1', name: 'Rings' },
    { id: '2', name: 'Necklaces' },
    { id: '3', name: 'Earrings' },
    { id: '4', name: 'Bracelets' },
    { id: '5', name: 'Watches' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Auto-generate slug from name
      if (name === 'name') {
        const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setFormData(prev => ({ ...prev, slug }));
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Category data:', formData);
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">
            {parentId ? 'Add New Subcategory' : 'Add New Category'}
          </h1>
          <p className="text-slate-600">
            {parentId ? 'Create a new subcategory under the selected parent' : 'Create a new product category'}
          </p>
        </div>
        <Link
          to="/admin/categories"
          className="btn-secondary flex items-center space-x-2"
        >
          <X size={20} />
          <span>Cancel</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Category Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-elegant"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="input-elegant"
                  placeholder="category-slug"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  URL-friendly version of the name. Auto-generated from name.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-elegant"
                  placeholder="Enter category description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Parent Category
                  </label>
                  <select
                    name="parentId"
                    value={formData.parentId}
                    onChange={handleInputChange}
                    className="input-elegant"
                   disabled={!!parentId}
                  >
                    <option value="">No Parent (Top Level)</option>
                    {parentCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                 {parentId && (
                   <p className="text-xs text-slate-500 mt-1">
                     Parent category is pre-selected from the previous page.
                   </p>
                 )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleInputChange}
                    className="input-elegant"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="input-elegant"
                  placeholder="SEO title for this category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-elegant"
                  placeholder="SEO description for this category"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category Image */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Category Image</h2>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Category preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setFormData(prev => ({ ...prev, image: '' }));
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
                <ImageIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <p className="text-slate-600 mb-2">Upload category image</p>
                <p className="text-sm text-slate-500 mb-4">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="btn-secondary cursor-pointer inline-flex items-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Choose Image</span>
                </label>
              </div>
            )}
          </div>

          {/* Category Settings */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Category Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Active Status
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Show on Homepage
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="showOnHomepage"
                    checked={formData.showOnHomepage}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card p-6">
            <div className="space-y-3">
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>Save Category</span>
              </button>
              <button
                type="button"
                className="btn-secondary w-full"
              >
                Save as Draft
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              {parentId ? 'Subcategory Info' : 'Category Info'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <span className={formData.isActive ? 'text-green-600' : 'text-red-600'}>
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Level:</span>
                <span className="text-slate-800">
                  {formData.parentId ? 'Subcategory' : 'Top Level'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Homepage:</span>
                <span className="text-slate-800">
                  {formData.showOnHomepage ? 'Visible' : 'Hidden'}
                </span>
              </div>
              {parentId && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Parent:</span>
                  <span className="text-slate-800">
                    {parentCategories.find(cat => cat.id === parentId)?.name || 'Selected'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;