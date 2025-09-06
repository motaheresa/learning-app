// src/features/pdf-viewer/components/PDFViewer.tsx
'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useRef, useState } from 'react';
import { usePdfTextSelection } from '../hooks/usePdfTextSelection';
import { speakText } from '../services/speechService';
import { translateToArabic } from '../services/translationService';
import { ZoomIn, ZoomOut, RotateCw, Download, Loader2, HelpCircle, Image as ImageIcon } from 'lucide-react';
import QuestionOverlay from './QuestionOverlay';
import AnswerOverlay from './AnswerOverlay';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdf: string;
  isDarkMode?: boolean;
  fileId?: number;
}

type Question = {
  id: number;
  fileId: number;
  pageNumber: number;
  title: string;
  type: "MULTIPLE_CHOICE" | "COMPLETION";
  content: any;
  answer: any;
};

type AnswerImage = {
  id: number;
  fileId: number;
  pageNumber: number;
  imagePath: string;
  description?: string;
};

export default function PDFViewer({ pdf, isDarkMode = false, fileId }: PDFViewerProps) {
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Questions and Answers state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answerImages, setAnswerImages] = useState<AnswerImage[]>([]);
  const [showQuestionOverlay, setShowQuestionOverlay] = useState(false);
  const [showAnswerOverlay, setShowAnswerOverlay] = useState(false);
  
  const {
    selectedText,
    menuPosition,
    showMenu,
    setShowMenu,
    handleTextSelection
  } = usePdfTextSelection();

  // Load questions and answers when fileId is available
  useEffect(() => {
    if (fileId) {
      loadQuestionsAndAnswers();
    }
  }, [fileId]);

  const loadQuestionsAndAnswers = async () => {
    if (!fileId) return;
    
    try {
      // Load questions
      const questionsRes = await fetch(`/api/admin/questions?fileId=${fileId}`);
      if (questionsRes.ok) {
        const questionsData = await questionsRes.json();
        setQuestions(questionsData);
      }

      // Load answer images
      const answersRes = await fetch(`/api/admin/answer-images?fileId=${fileId}`);
      if (answersRes.ok) {
        const answersData = await answersRes.json();
        setAnswerImages(answersData);
      }
    } catch (error) {
      console.error('Error loading questions and answers:', error);
    }
  };

  // Get questions and answers for current page
  const currentPageQuestions = questions.filter(q => q.pageNumber === currentPage);
  const currentPageAnswers = answerImages.filter(a => a.pageNumber === currentPage);

  // Responsive scale calculation
  const calculateResponsiveScale = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 0.6; // Mobile
      if (width < 768) return 0.8; // Tablet
      return 1.0; // Desktop
    }
    return 1.0;
  };

  useEffect(() => {
    setScale(calculateResponsiveScale());
    
    const handleResize = () => {
      setScale(calculateResponsiveScale());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSpeakEnglish = () => {
    speakText(selectedText, 'en-US');
    setShowMenu(false);
  };

  const handleSpeakArabic = async () => {
    try {
      setIsTranslating(true);
      const translatedText = await translateToArabic(selectedText);
      speakText(translatedText, 'ar-SA');
    } catch (err) {
      console.error('Translation failed:', err);
      speakText(selectedText, 'en-US'); // Fallback to English
    } finally {
      setShowMenu(false);
      setIsTranslating(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError('Failed to load PDF file');
    setIsLoading(false);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.4));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= (numPages || 1)) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pdfContainerRef.current && !pdfContainerRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Controls Header */}
      <div className={`sticky top-0 z-10 border-b shadow-sm transition-colors ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* PDF Info */}
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {numPages && (
                <span>
                  Page {currentPage} of {numPages}
                </span>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Page Navigation */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage <= 1
                      ? 'opacity-50 cursor-not-allowed'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  ←
                </button>
                <input
                  type="number"
                  min="1"
                  max={numPages || 1}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value))}
                  className={`w-16 px-2 py-1 text-center text-sm border rounded ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-300'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= (numPages || 1)}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage >= (numPages || 1)
                      ? 'opacity-50 cursor-not-allowed'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  →
                </button>
              </div>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

              {/* Zoom Controls */}
              <button
                onClick={handleZoomOut}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className={`text-sm px-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Rotate */}
              <button
                onClick={handleRotate}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Rotate"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Download */}
              <a
                href={pdf}
                download
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        <div ref={pdfContainerRef} className="relative flex justify-center">
          <div onMouseUp={handleTextSelection} onTouchEnd={handleTextSelection} className="pdf-viewer-container">
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className={`flex flex-col items-center justify-center h-64 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p>Loading PDF file...</p>
                </div>
              }
              className="pdf-document"
            >
              {error && (
                <div className={`p-6 rounded-lg border ${
                  isDarkMode
                    ? 'bg-red-900/20 border-red-800 text-red-300'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <p className="font-medium">Error loading PDF</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}

              {!error && (
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  rotate={rotation}
                  loading={
                    <div className={`flex flex-col items-center justify-center h-64 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <Loader2 className="w-6 h-6 animate-spin mb-2" />
                      <p className="text-sm">Loading page {currentPage}...</p>
                    </div>
                  }
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className={`pdf-page shadow-lg ${
                    isDarkMode ? 'shadow-gray-900' : 'shadow-gray-300'
                  }`}
                />
              )}
            </Document>
          </div>

          {/* Floating Translation Buttons */}
<div className="fixed top-1/2 right-4 z-50 flex flex-col gap-2 -translate-y-1/2">
  <button
    onClick={handleSpeakEnglish}
    disabled={!selectedText || isTranslating}
    className={`p-2 rounded-full shadow-md text-xs font-medium transition-all ${
      !selectedText || isTranslating
        ? "opacity-40 cursor-not-allowed bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }`}
    title="Speak English"
  >
    EN
  </button>
  <button
    onClick={handleSpeakArabic}
    disabled={!selectedText || isTranslating}
    className={`p-2 rounded-full shadow-md text-xs font-medium transition-all ${
      !selectedText || isTranslating
        ? "opacity-40 cursor-not-allowed bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
        : "bg-green-500 hover:bg-green-600 text-white"
    }`}
    title="Translate & Speak Arabic"
  >
    AR
  </button>
</div>

        </div>

        {/* Floating Action Buttons for Questions and Answers */}
        {fileId && (currentPageQuestions.length > 0 || currentPageAnswers.length > 0) && (
          <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
            {/* Questions Button */}
            {currentPageQuestions.length > 0 && (
              <button
                onClick={() => setShowQuestionOverlay(true)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                title={`${currentPageQuestions.length} question${currentPageQuestions.length > 1 ? 's' : ''} on this page`}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Questions ({currentPageQuestions.length})</span>
              </button>
            )}

            {/* Answers Button */}
            {currentPageAnswers.length > 0 && (
              <button
                onClick={() => setShowAnswerOverlay(true)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 ${
                  isDarkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                title={`${currentPageAnswers.length} answer image${currentPageAnswers.length > 1 ? 's' : ''} on this page`}
              >
                <ImageIcon className="w-5 h-5" />
                <span className="font-medium">Answers ({currentPageAnswers.length})</span>
              </button>
            )}
          </div>
        )}

        {/* Question Overlay */}
        {showQuestionOverlay && (
          <QuestionOverlay
            questions={currentPageQuestions}
            onClose={() => setShowQuestionOverlay(false)}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Answer Overlay */}
        {showAnswerOverlay && (
          <AnswerOverlay
            answerImages={currentPageAnswers}
            onClose={() => setShowAnswerOverlay(false)}
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      <style jsx>{`
        .pdf-viewer-container {
          max-width: 100%;
          overflow-x: auto;
        }
        .pdf-document {
          display: flex;
          justify-content: center;
        }
        .pdf-page {
          margin: 0 auto;
          border-radius: 8px;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .pdf-page {
            border-radius: 4px;
          }
        }
      `}</style>
    </div>
  );
}