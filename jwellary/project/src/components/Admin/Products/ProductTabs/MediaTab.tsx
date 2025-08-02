import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Video, Move, Eye } from 'lucide-react';

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newImages.push(result);
          if (newImages.length === files.length) {
            updateFormData({
              images: [...formData.images, ...newImages]
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newVideos: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newVideos.push(result);
          if (newVideos.length === files.length) {
            updateFormData({
              videos: [...formData.videos, ...newVideos]
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_: string, i: number) => i !== index);
    updateFormData({ images: updatedImages });
  };

  const removeVideo = (index: number) => {
    const updatedVideos = formData.videos.filter((_: string, i: number) => i !== index);
    updateFormData({ videos: updatedVideos });
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...formData.images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    updateFormData({ images: updatedImages });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveImage(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Product Media</h2>
        <p className="text-slate-600 mb-6">
          Upload high-quality images and videos to showcase your product. The first image will be used as the main product image.
        </p>
      </div>

      {validationErrors.images && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {validationErrors.images}
        </div>
      )}

      {/* Image Upload Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Product Images</h3>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors mb-6">
          <ImageIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <p className="text-slate-600 mb-2">Drop images here or click to upload</p>
          <p className="text-sm text-slate-500 mb-4">PNG, JPG, WEBP up to 10MB each</p>
          <input
            type="file"
            multiple
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
            <span>Choose Images</span>
          </label>
        </div>

        {/* Image Grid */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.images.map((image: string, index: number) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`relative group bg-white rounded-xl border-2 border-slate-200 overflow-hidden cursor-move hover:border-primary-400 transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                
                {/* Main Image Badge */}
                {index === 0 && (
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
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Remove"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Drag Handle */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Move size={16} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {formData.images.length > 0 && (
          <p className="text-sm text-slate-500 mt-4">
            Drag and drop images to reorder them. The first image will be used as the main product image.
          </p>
        )}
      </div>

      {/* Video Upload Section */}
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Product Videos (Optional)</h3>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors mb-6">
          <Video className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <p className="text-slate-600 mb-2">Drop videos here or click to upload</p>
          <p className="text-sm text-slate-500 mb-4">MP4, MOV, AVI up to 50MB each</p>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="btn-secondary cursor-pointer inline-flex items-center space-x-2"
          >
            <Upload size={16} />
            <span>Choose Videos</span>
          </label>
        </div>

        {/* Video Grid */}
        {formData.videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.videos.map((video: string, index: number) => (
              <div
                key={index}
                className="relative group bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:border-primary-400 transition-all duration-300"
              >
                <video
                  src={video}
                  className="w-full h-32 object-cover"
                  controls={false}
                  muted
                />
                
                {/* Video Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => removeVideo(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Remove"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Media Guidelines */}
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Media Guidelines</h3>
        <div className="bg-slate-50 rounded-xl p-6">
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
              <h4 className="font-medium text-slate-800 mb-2">Video Requirements</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Format: MP4, MOV, or AVI</li>
                <li>• Maximum file size: 50MB per video</li>
                <li>• Recommended duration: 15-60 seconds</li>
                <li>• Resolution: 720p or higher</li>
                <li>• Show product from multiple angles</li>
              </ul>
            </div>
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