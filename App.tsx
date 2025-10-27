
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { ImageDisplay } from './components/ImageDisplay';
import { PromptControls } from './components/PromptControls';
import { Loader } from './components/Loader';
import { editImageWithPrompt } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { MagicWandIcon } from './components/Icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = useCallback((file: File) => {
    setOriginalImage(file);
    setEditedImage(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const base64Data = await fileToBase64(originalImage);
      // The fileToBase64 function returns a data URL, we need to extract the base64 part.
      const base64String = base64Data.split(',')[1];
      
      const resultBase64 = await editImageWithPrompt(base64String, originalImage.type, prompt);
      
      setEditedImage(`data:image/jpeg;base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 lg:p-8 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
          {/* Left Panel */}
          <div className="flex flex-col bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">1. Upload Image</h2>
            <ImageUpload onImageChange={handleImageChange} currentImagePreview={originalImagePreview} />
            <div className="mt-6 flex-grow flex flex-col">
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">2. Describe Your Edit</h2>
              <PromptControls
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isDisabled={!originalImage}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Result</h2>
            <div className="flex-grow flex items-center justify-center rounded-lg bg-gray-900/50 relative overflow-hidden">
              {isLoading && <Loader />}
              {error && !isLoading && (
                <div className="text-center text-red-400 p-4">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </div>
              )}
              {!isLoading && !error && editedImage && (
                <ImageDisplay imageUrl={editedImage} altText="Edited image" />
              )}
              {!isLoading && !error && !editedImage && (
                 <div className="text-center text-gray-400 p-4 flex flex-col items-center">
                    <MagicWandIcon className="w-16 h-16 mb-4 text-gray-500" />
                    <p className="text-lg">Your edited image will appear here.</p>
                    <p className="text-sm text-gray-500">Let's create some magic!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini 2.5 Flash Image</p>
      </footer>
    </div>
  );
};

export default App;
