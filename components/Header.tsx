
import React from 'react';
import { PhotoIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center">
        <PhotoIcon className="w-8 h-8 mr-3 text-indigo-400" />
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
            Gemini Image Editor
            </h1>
            <p className="text-sm text-gray-400">强大的照片编辑功能 (Powerful Photo Editing)</p>
        </div>
      </div>
    </header>
  );
};
