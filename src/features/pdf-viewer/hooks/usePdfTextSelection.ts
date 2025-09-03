// src/features/pdf-viewer/hooks/usePdfTextSelection.ts
import { useState, useEffect } from 'react';

export const usePdfTextSelection = () => {
  const [selectedText, setSelectedText] = useState('');
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  // Track the current text whenever selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        setSelectedText(text);
      } else {
        setSelectedText('');
        setShowMenu(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  // Called on mouseup/touchend → sets menu position
  const handleTextSelection = () => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length === 0) {
        setShowMenu(false);
        return;
      }

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setMenuPosition({
          x: rect.left + window.scrollX + rect.width / 2,
          y: rect.top + window.scrollY - 50, // slightly above
        });
        setShowMenu(true);
      } catch (e) {
        setShowMenu(false);
      }
    }, 50); // ⏱️ wait a bit for mobile selection to settle
  };

  return {
    selectedText,
    menuPosition,
    showMenu,
    setShowMenu,
    handleTextSelection,
  };
};
