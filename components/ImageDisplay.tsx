
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string;
  altText: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, altText }) => {
  return (
    <div className="w-full h-full p-2">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-contain rounded-lg animate-fade-in"
      />
      <style>
        {`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};
