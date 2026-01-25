import React, { useEffect, useState } from 'react';
import { Photo } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  photo: Photo;
  photos: Photo[]; // Receive the filtered list of photos
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ photo: initialPhoto, photos = [], onClose }) => {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | undefined>(initialPhoto);

  useEffect(() => {
    setCurrentPhoto(initialPhoto);
  }, [initialPhoto]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleThumbnailClick = (p: Photo) => {
    setCurrentPhoto(p);
  };

  // Safety guard: if currentPhoto is lost, return null
  if (!currentPhoto) return null;

  // Calculate index based on the PASSED photos array
  const currentIndex = photos.findIndex(p => p.id === currentPhoto.id);
  
  const handlePrev = () => {
     if (photos.length === 0) return;
     const safeIndex = currentIndex === -1 ? 0 : currentIndex;
     const nextIndex = safeIndex > 0 ? safeIndex - 1 : photos.length - 1;
     
     if (photos[nextIndex]) {
        setCurrentPhoto(photos[nextIndex]);
     }
  };
  
  const handleNext = () => {
     if (photos.length === 0) return;
     const safeIndex = currentIndex === -1 ? 0 : currentIndex;
     const nextIndex = safeIndex < photos.length - 1 ? safeIndex + 1 : 0;
     
     if (photos[nextIndex]) {
        setCurrentPhoto(photos[nextIndex]);
     }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 absolute top-0 left-0 right-0 z-10">
        <h2 
            onClick={onClose}
            className="text-xl md:text-2xl font-extrabold tracking-widest uppercase heading-font text-stone-900 cursor-pointer hover:opacity-70 transition-opacity"
        >
            Michael Förtsch
        </h2>
        <button 
          onClick={onClose}
          className="text-stone-900 hover:opacity-50 transition-opacity"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-12 overflow-hidden bg-white">
        
        {/* Nav Buttons - Only show if we have multiple photos */}
        {photos.length > 1 && (
            <>
                <button onClick={handlePrev} className="absolute left-4 md:left-8 p-2 text-stone-400 hover:text-stone-900 transition-colors z-20">
                    <ChevronLeft size={32} />
                </button>
                <button onClick={handleNext} className="absolute right-4 md:right-8 p-2 text-stone-400 hover:text-stone-900 transition-colors z-20">
                    <ChevronRight size={32} />
                </button>
            </>
        )}

        <img 
          src={currentPhoto.src} 
          alt={currentPhoto.title} 
          className="max-w-full max-h-[70vh] object-contain shadow-sm"
        />
        
        {/* Caption */}
        <div className="absolute bottom-24 md:bottom-28 left-0 right-0 text-center pointer-events-none">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-900 bg-white/80 backdrop-blur inline-block px-3 py-1">
                {currentPhoto.title} — {currentPhoto.client}
            </p>
        </div>
      </div>

      {/* Filmstrip Footer */}
      <div className="h-20 md:h-24 border-t border-stone-100 bg-white flex items-center justify-center px-4 overflow-x-auto no-scrollbar z-20">
        <div className="flex gap-2 h-full py-4 items-center min-w-min">
            {photos.map((p) => (
                <div 
                    key={p.id}
                    onClick={() => handleThumbnailClick(p)}
                    className={`
                        h-full aspect-square cursor-pointer overflow-hidden transition-all duration-300
                        ${currentPhoto.id === p.id ? 'opacity-100 ring-2 ring-stone-900' : 'opacity-40 hover:opacity-100'}
                    `}
                >
                    <img src={p.src} className="w-full h-full object-cover" alt="" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};