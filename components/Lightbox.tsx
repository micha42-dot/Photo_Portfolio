import React, { useEffect, useCallback } from 'react';
import { Photo } from '../types';

interface LightboxProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const Lightbox: React.FC<LightboxProps> = ({ 
  photo, 
  isOpen, 
  onClose, 
  onNext, 
  onPrev,
  hasNext,
  hasPrev
}) => {
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowRight':
        if (hasNext) onNext();
        break;
      case 'ArrowLeft':
        if (hasPrev) onPrev();
        break;
    }
  }, [isOpen, hasNext, hasPrev, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Image Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
        <img 
          src={photo.src} 
          alt={photo.title || 'Portfolio Image'} 
          className="max-h-full max-w-full object-contain shadow-2xl"
        />
        
        {/* Caption */}
        {photo.title && (
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                <p className="text-white/80 text-sm tracking-widest uppercase font-light">{photo.title}</p>
            </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className={`absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors ${!hasPrev ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!hasPrev}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className={`absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors ${!hasNext ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!hasNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
