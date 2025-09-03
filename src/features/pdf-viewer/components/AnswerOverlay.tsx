// src/features/pdf-viewer/components/AnswerOverlay.tsx
"use client";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

type AnswerImage = {
  id: number;
  fileId: number;
  pageNumber: number;
  imagePath: string;
  description?: string;
};

interface AnswerOverlayProps {
  answerImages: AnswerImage[];
  onClose: () => void;
  isDarkMode?: boolean;
}

export default function AnswerOverlay({ answerImages, onClose, isDarkMode = false }: AnswerOverlayProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);

  if (answerImages.length === 0) return null;

  const currentImage = answerImages[currentImageIndex];

  const nextImage = () => {
    if (currentImageIndex < answerImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setImageZoom(1); // Reset zoom when changing images
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setImageZoom(1); // Reset zoom when changing images
    }
  };

  const zoomIn = () => setImageZoom(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setImageZoom(prev => Math.max(prev - 0.25, 0.5));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className={`max-w-4xl w-full max-h-[90vh] rounded-xl shadow-xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex justify-between items-center p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div>
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Page {currentImage.pageNumber} Answer Images
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Image {currentImageIndex + 1} of {answerImages.length}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              onClick={zoomOut}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className={`text-sm px-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {Math.round(imageZoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ml-2 ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative overflow-hidden" style={{ height: 'calc(90vh - 140px)' }}>
          <div className="h-full overflow-auto flex items-center justify-center p-4">
            <img
              src={currentImage.imagePath}
              alt={currentImage.description || `Answer ${currentImageIndex + 1}`}
              className="max-w-full h-auto rounded-lg shadow-lg transition-transform"
              style={{ 
                transform: `scale(${imageZoom})`,
                transformOrigin: 'center'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/400/300';
              }}
            />
          </div>

          {/* Navigation Arrows */}
          {answerImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all ${
                  currentImageIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-80 hover:opacity-100'
                } ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                disabled={currentImageIndex === answerImages.length - 1}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all ${
                  currentImageIndex === answerImages.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-80 hover:opacity-100'
                } ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            {/* Image Description */}
            <div className="flex-1 mr-4">
              {currentImage.description && (
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {currentImage.description}
                </p>
              )}
            </div>

            {/* Image Navigation Dots */}
            {answerImages.length > 1 && (
              <div className="flex items-center gap-2">
                {answerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setImageZoom(1);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex
                        ? isDarkMode
                          ? 'bg-green-500 scale-110'
                          : 'bg-green-600 scale-110'
                        : isDarkMode
                          ? 'bg-gray-600 hover:bg-gray-500'
                          : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    title={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}