
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
      <p className="mt-4 text-lg text-gray-300">Generating your masterpiece...</p>
    </div>
  );
};
