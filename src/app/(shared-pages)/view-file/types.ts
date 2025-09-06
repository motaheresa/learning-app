// src/features/pdf-viewer/types.ts
import { DocumentProps } from 'react-pdf';

export interface PdfDocumentProps {
  file: string;
  numPages: number | null;
  error: string | null;
  isLoading: boolean;
  onLoadSuccess: DocumentProps['onLoadSuccess'];
  onLoadError: (error: Error) => void;
  handleTextSelection: () => void;
}

export interface ContextMenuProps {
  position: { x: number; y: number };
  showMenu: boolean;
  isLoading: boolean;
  onSpeakEnglish: () => void;
  onSpeakArabic: () => void;
}