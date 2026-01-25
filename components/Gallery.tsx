import React from 'react';
import { Photo } from '../types';

interface GalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  title: string;
  isSearching: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoClick, title, isSearching }) => {
  return (
    <div className="w-full animate-fade-in">
      {/* Optional Title - mostly hidden for minimalist look unless searching */}
      {(title !== 'Alle Arbeiten' && title !== 'Overview') && (
        <div className="mb-12 text-center">
           <h2 className="text-3xl font-bold heading-font uppercase tracking-widest text-stone-900">{title}</h2>
        </div>
      )}

      {photos.length === 0 ? (
        <div className="w-full h-64 flex items-center justify-center text-stone-400 font-medium text-sm">
          Keine Bilder gefunden.
        </div>
      ) : (
        /* 
           Masonry Layout using CSS Columns.
           This allows images to keep their natural height/aspect ratio without strict row alignment.
        */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group cursor-pointer relative break-inside-avoid mb-6 md:mb-8 bg-stone-50"
              onClick={() => onPhotoClick(photo)}
            >
              <img 
                src={photo.src} 
                alt={photo.title} 
                className="w-full h-auto object-contain transition-opacity duration-700 ease-in-out group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};