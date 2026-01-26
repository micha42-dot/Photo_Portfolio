import React from 'react';
import { Photo } from '../types';

interface GalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoClick }) => {
  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 py-8">
      {/* Tailwind CSS Columns for Masonry Layout without JS libs */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="break-inside-avoid relative group cursor-pointer overflow-hidden"
            onClick={() => onPhotoClick(photo)}
          >
            <img 
              src={photo.src} 
              alt={photo.title || 'Michael Förtsch Photography'}
              className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 filter brightness-95 hover:brightness-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
      
      {photos.length === 0 && (
        <div className="flex justify-center items-center h-64 text-gray-400 font-light">
          No images found in this category.
        </div>
      )}
    </div>
  );
};
