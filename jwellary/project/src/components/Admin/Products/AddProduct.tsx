import React, { useState, useEffect } from 'react';
import { Save, X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCategories } from '../../../data/mockData';
import axios from 'axios';
import BasicDetailsTab from './ProductTabs/BasicDetailsTab';
import VariantsTab from './ProductTabs/VariantsTab';
import MediaTab from './ProductTabs/MediaTab';
import ReviewTab from './ProductTabs/ReviewTab';

interface ProductFormData {
  // Basic Details
  id?: string; // Product ID returned from server
  name: string;
  description: string;
  basePrice: string;
  category: string;
  
  // Variants
  variants: Array<{
    id: string;
    name: string;
    price: string;
    stock: string;
    sku: string;
    options: Record<string, string>;
  }>;
  
  // Media
  variantImages: Record<string, string[]>; // variantId -> image URLs
  
  // Additional
  inStock: boolean;
  featured: boolean;
}

const AddProduct: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    basePrice: '',
    category: '',
    variants: [],
    variantImages: {},
    inStock: true,
    featured: false,
  });

  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const steps = [
    { id: 'basic', label: 'Basic Details', icon: '1' },
    { id: 'variants', label: 'Variants', icon: '2' },
    { id: 'media', label: 'Media', icon: '3' },
    { id: 'review', label: 'Review', icon: '4' },
  ];

  // Mock category-based options
  const getCategoryOptions = (categoryId: string) => {
    const optionsMap: Record<string, any[]> = {
      'rings': [
        {
          id: 'ring_size',
          name: 'Ring Size',
          type: 'select',
          required: true,
          values: ['5', '6', '7', '8', '9', '10', '11', '12']
        },
        {
          id: 'metal_type',
          name: 'Metal Type',
          type: 'select',
          required: true,
          values: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold']
        }
      ],
      'necklaces': [
        {
          id: 'chain_length',
          name: 'Chain Length',
          type: 'select',
          required: true,
          values: ['16"', '18"', '20"', '22"', '24"']
        },
        {
          id: 'metal_type',
          name: 'Metal Type',
          type: 'select',
          required: true,
          values: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold']
        }
      ],
      'earrings': [
        {
          id: 'earring_type',
          name: 'Earring Type',
          type: 'select',
          required: true,
          values: ['Stud', 'Drop', 'Hoop', 'Chandelier']
        },
        {
          id: 'metal_type',
          name: 'Metal Type',
          type: 'select',
          required: true,
          values: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold']
        }
      ],
      'bracelets': [
        {
          id: 'bracelet_size',
          name: 'Bracelet Size',
          type: 'select',
          required: true,
          values: ['Small (6-7")', 'Medium (7-8")', 'Large (8-9")']
        },
        {
          id: 'metal_type',
          name: 'Metal Type',
          type: 'select',
          required: true,
          values: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold']
        }
      ],
      'watches': [
        {
          id: 'watch_size',
          name: 'Watch Size',
          type: 'select',
          required: true,
          values: ['38mm', '40mm', '42mm', '44mm']
        },
        {
          id: 'band_material',
          name: 'Band Material',
          type: 'select',
          required: true,
          values: ['Leather', 'Metal', 'Rubber', 'Fabric']
        }
      ]
    };

    return optionsMap[categoryId] || [];
  };

  useEffect(() => {
    if (formData.category) {
      const options = getCategoryOptions(formData.category);
      setCategoryOptions(options);
      // Reset selected options when category changes
      setFormData(prev => ({ ...prev, selectedOptions: {} }));
    }
  }, [formData.category]);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 0: // Basic Details
        if (!formData.name.trim()) errors.name = 'Product name is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        if (!formData.basePrice || parseFloat(formData.basePrice) <= 0) {
          errors.basePrice = 'Valid base price is required';
        }
        if (!formData.category) errors.category = 'Category is required';
        break;

      case 1: // Variants
        if (formData.variants.length === 0) {
          errors.variants = 'At least one variant is required';
        } else {
          formData.variants.forEach((variant, index) => {
            if (!variant.name.trim()) {
              errors[`variant_${index}_name`] = 'Variant name is required';
            }
            if (!variant.price || parseFloat(variant.price) <= 0) {
              errors[`variant_${index}_price`] = 'Valid price is required';
            }
            if (!variant.stock || parseInt(variant.stock) < 0) {
              errors[`variant_${index}_stock`] = 'Valid stock quantity is required';
            }
          });
        }
        break;

      case 2: // Media
        const hasImages = Object.values(formData.variantImages || {}).some(
          (images: string[]) => images.length > 0
        );
        if (!hasImages) {
          errors.images = 'At least one variant must have images';
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Product data:', formData);
      // Handle form submission
      alert('Product created successfully!');
    }
  };

  const updateFormData = (updates: Partial<ProductFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.basePrice || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare data for API
      const draftData = {
        name: formData.name,
        description: formData.description,
        basePrice: parseFloat(formData.basePrice),
        category: formData.category,
        inStock: formData.inStock,
        featured: formData.featured,
        status: 'draft'
      };

      // API call to save draft
      const response = await axios.post('/api/products/draft', draftData);
      
      // Update form data with returned product ID
      updateFormData({ id: response.data.productId });
      
      // Show success message (handled in BasicDetailsTab)
      console.log('Draft saved successfully:', response.data);
      
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicDetailsTab
            formData={formData}
            updateFormData={updateFormData}
            categoryOptions={categoryOptions}
            validationErrors={validationErrors}
            onSaveDraft={handleSaveDraft}
            isSavingDraft={isSavingDraft}
            productId={formData.id}
          />
        );
      case 1:
        return (
          <VariantsTab
            formData={formData}
            updateFormData={updateFormData}
            categoryOptions={categoryOptions}
            validationErrors={validationErrors}
          />
        );
      case 2:
        return (
          <MediaTab
            formData={formData}
            updateFormData={updateFormData}
            validationErrors={validationErrors}
          />
        );
      case 3:
        return (
          <ReviewTab
            formData={formData}
            categoryOptions={categoryOptions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">Add New Product</h1>
          <p className="text-slate-600">Create a new jewelry product with detailed specifications</p>
        </div>
        <Link
          to="/admin/products"
          className="btn-secondary flex items-center space-x-2"
        >
          <X size={20} />
          <span>Cancel</span>
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  index < currentStep 
                    ? 'bg-green-500 border-green-500 text-white'
                    : index === currentStep
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-white border-slate-300 text-slate-500'
                }`}>
                  {index < currentStep ? <Check size={20} /> : step.icon}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    index <= currentStep ? 'text-slate-800' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-green-500' : 'bg-slate-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="card p-6 min-h-[500px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`btn-secondary flex items-center space-x-2 ${
            currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ArrowLeft size={20} />
          <span>Previous</span>
        </button>

        <div className="text-sm text-slate-600">
          Step {currentStep + 1} of {steps.length}
        </div>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center space-x-2"
          >
            <Save size={20} />
            <span>Create Product</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProduct;