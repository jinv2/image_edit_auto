
import React, { useRef, useState } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploadProps {
  onImageChange: (file: File) => void;
  currentImagePreview: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, currentImagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageChange(file);
    }
  };


  return (
    <div 
        className={`relative group border-2 border-dashed rounded-lg p-4 h-64 flex flex-col justify-center items-center text-center cursor-pointer transition-colors duration-300
        ${isDragging ? 'border-indigo-400 bg-indigo-900/20' : 'border-gray-600 hover:border-indigo-500 hover:bg-gray-800/80'}`}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {currentImagePreview ? (
        <img src={currentImagePreview} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
      ) : (
        <>
            <UploadIcon className="w-12 h-12 text-gray-500 group-hover:text-indigo-400 transition-colors" />
            <p className="mt-2 text-gray-400 group-hover:text-white">
            <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </>
      )}
    </div>
  );
};
