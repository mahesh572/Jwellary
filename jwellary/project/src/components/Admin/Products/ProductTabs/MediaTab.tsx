import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Save, Eye, Move, Loader } from 'lucide-react';

interface MediaTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
  validationErrors: Record<string, string>;
}

const MediaTab: React.FC<MediaTabProps> = ({
  formData,
  updateFormData,
  validationErrors
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [savingVariant, setSavingVariant] = useState<string | null>(null);
  const [uploadingVariant, setUploadingVariant] = useState<string | null>(null);

  // Initialize variant images if not exists
  const initializeVariantImages = () => {
    const variantImages: Record<string, string[]> = {};
    formData.variants.forEach((variant: any) => {
      if (!formData.variantImages?.[variant.id]) {
        variantImages[variant.id] = [];
      } else {
        variantImages[variant.id] = formData.variantImages[variant.id];
      }
    });
    
    if (Object.keys(variantImages).length > 0) {
      updateFormData({
        variantImages: {
          ...formData.variantImages,
          ...variantImages
        }
      });
    }
  };

  React.useEffect(() => {
    initializeVariantImages();
  }, [formData.variants]);

  const handleImageUpload = (variantId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadingVariant(variantId);
      const newImages: string[] = [];
      let processedFiles = 0;

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newImages.push(result);
          processedFiles++;
          
          if (processedFiles === files.length) {
            const currentImages = formData.variantImages?.[variantId] || [];
            updateFormData({
              variantImages: {
                ...formData.variantImages,
                [variantId]: [...currentImages, ...newImages]
              }
            });
            setUploadingVariant(null);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (variantId: string, imageIndex: number) => {
    const currentImages = formData.variantImages?.[variantId] || [];
    const updatedImages = currentImages.filter((_: string, i: number) => i !== imageIndex);
    
    updateFormData({
      variantImages: {
        ...formData.variantImages,
        [variantId]: updatedImages
      }
    });
  };

  const moveImage = (variantId: string, fromIndex: number, toIndex: number) => {
    const currentImages = [...(formData.variantImages?.[variantId] || [])];
    const [movedImage] = currentImages.splice(fromIndex, 1);
    currentImages.splice(toIndex, 0, movedImage);
    
    updateFormData({
      variantImages: {
        ...formData.variantImages,
        [variantId]: currentImages
      }
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (variantId: string, e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveImage(variantId, draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const saveVariantImages = async (variantId: string) => {
    setSavingVariant(variantId);
    
    try {
      const images = formData.variantImages?.[variantId] || [];
      
      // Simulate API call to save images
      const response = await fetch('/api/variants/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variantId,
          images: images
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Update with server URLs
        updateFormData({
          variantImages: {
            ...formData.variantImages,
            [variantId]: data.imageUrls
          }
        });
        
        // Show success message
        alert('Images saved successfully!');
      } else {
        throw new Error('Failed to save images');
      }
    } catch (error) {
      console.error('Error saving images:', error);
      alert('Failed to save images. Please try again.');
    } finally {
      setSavingVariant(null);
    }
  };

  const getVariantName = (variant: any) => {
    if (variant.name) return variant.name;
    
    const optionValues = Object.values(variant.options || {}).filter(Boolean);
    if (optionValues.length > 0) {
      return optionValues.join(' - ');
    }
    
    return `Variant ${formData.variants.indexOf(variant) + 1}`;
  };

  if (formData.variants.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Product Media</h2>
          <p className="text-slate-600 mb-6">
            Upload high-quality images for each product variant.
          </p>
        </div>

        <div className="text-center py-12 bg-slate-50 rounded-xl">
          <ImageIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">No Variants Created</h3>
          <p className="text-slate-500">
            Please create product variants in the previous step to upload images.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Product Media</h2>
        <p className="text-slate-600 mb-6">
          Upload high-quality images for each product variant. Each variant can have multiple images.
        </p>
      </div>

      {validationErrors.images && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {validationErrors.images}
        </div>
      )}

      {/* Variants List */}
      <div className="space-y-8">
        {formData.variants.map((variant: any, variantIndex: number) => {
          const variantImages = formData.variantImages?.[variant.id] || [];
          const isUploading = uploadingVariant === variant.id;
          const isSaving = savingVariant === variant.id;
          
          return (
            <div key={variant.id} className="card p-6">
              {/* Variant Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {getVariantName(variant)}
                  </h3>
                  <p className="text-sm text-slate-600">
                    Price: ${parseFloat(variant.price || '0').toFixed(2)} | Stock: {variant.stock}
                  </p>
                </div>
                
                {variantImages.length > 0 && (
                  <button
                    onClick={() => saveVariantImages(variant.id)}
                    disabled={isSaving}
                    className="btn-primary flex items-center space-x-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader className="animate-spin" size={16} />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save Images</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors mb-6">
                <ImageIcon className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                <p className="text-slate-600 mb-2">Drop images here or click to upload</p>
                <p className="text-sm text-slate-500 mb-4">PNG, JPG, WEBP up to 10MB each</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(variant.id, e)}
                  className="hidden"
                  id={`image-upload-${variant.id}`}
                  disabled={isUploading}
                />
                <label
                  htmlFor={`image-upload-${variant.id}`}
                  className={`btn-secondary cursor-pointer inline-flex items-center space-x-2 ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader className="animate-spin" size={16} />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      <span>Choose Images</span>
                    </>
                  )}
                </label>
              </div>

              {/* Images Grid */}
              {variantImages.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-slate-700">
                      Images ({variantImages.length})
                    </h4>
                    {variantImages.length > 0 && (
                      <p className="text-xs text-slate-500">
                        Drag to reorder • First image will be the main image
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {variantImages.map((image: string, imageIndex: number) => (
                      <div
                        key={imageIndex}
                        draggable
                        onDragStart={() => handleDragStart(imageIndex)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(variant.id, e, imageIndex)}
                        className={`relative group bg-white rounded-xl border-2 border-slate-200 overflow-hidden cursor-move hover:border-primary-400 transition-all duration-300 ${
                          imageIndex === 0 ? 'ring-2 ring-primary-500' : ''
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${getVariantName(variant)} ${imageIndex + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        
                        {/* Main Image Badge */}
                        {imageIndex === 0 && (
                          <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                            Main
                          </div>
                        )}

                        {/* Image Actions */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                          <button
                            onClick={() => setPreviewImage(image)}
                            className="p-2 bg-white text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                            title="Preview"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => removeImage(variant.id, imageIndex)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            title="Remove"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Drag Handle */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Move size={16} className="text-white drop-shadow-lg" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Images State */}
              {variantImages.length === 0 && (
                <div className="text-center py-8 bg-slate-50 rounded-xl">
                  <ImageIcon className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600">No images uploaded for this variant</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Media Guidelines */}
      <div className="card p-6 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Media Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-800 mb-2">Image Requirements</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Minimum resolution: 800x800 pixels</li>
              <li>• Recommended: 1200x1200 pixels or higher</li>
              <li>• Format: JPG, PNG, or WEBP</li>
              <li>• Maximum file size: 10MB per image</li>
              <li>• Use high-quality, well-lit photos</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 mb-2">Best Practices</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• First image becomes the main product image</li>
              <li>• Show product from multiple angles</li>
              <li>• Include detail shots of important features</li>
              <li>• Use consistent lighting and background</li>
              <li>• Save images after uploading to get server URLs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-white text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaTab;