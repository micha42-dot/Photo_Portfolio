import React, { useState, useMemo } from 'react';
import { Category, Photo } from './types';
import { PORTFOLIO_IMAGES } from './constants';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Lightbox } from './components/Lightbox';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoId, setCurrentPhotoId] = useState<string | null>(null);

  // Filter logic:
  // 1. If Category is ALL, show everything.
  // 2. Otherwise, only show photos matching the category.
  const filteredPhotos = useMemo(() => {
    if (activeCategory === Category.ALL) {
      return PORTFOLIO_IMAGES;
    }
    return PORTFOLIO_IMAGES.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Derived state for lightbox navigation
  const currentPhotoIndex = useMemo(() => {
    return filteredPhotos.findIndex(p => p.id === currentPhotoId);
  }, [filteredPhotos, currentPhotoId]);

  const currentPhoto = currentPhotoIndex >= 0 ? filteredPhotos[currentPhotoIndex] : null;

  const handlePhotoClick = (photo: Photo) => {
    setCurrentPhotoId(photo.id);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    if (currentPhotoIndex < filteredPhotos.length - 1) {
      setCurrentPhotoId(filteredPhotos[currentPhotoIndex + 1].id);
    } else {
        // Optional: Loop back to start
        setCurrentPhotoId(filteredPhotos[0].id); 
    }
  };

  const handlePrev = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoId(filteredPhotos[currentPhotoIndex - 1].id);
    } else {
        // Optional: Loop to end
        setCurrentPhotoId(filteredPhotos[filteredPhotos.length - 1].id);
    }
  };

  // Reset scroll on category change
  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      <Header 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      <main className="flex-grow">
        <Gallery 
          photos={filteredPhotos} 
          onPhotoClick={handlePhotoClick} 
        />
      </main>

      <Footer />

      <Lightbox 
        isOpen={lightboxOpen}
        photo={currentPhoto}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={true} // Always allowing loop or simple check
        hasPrev={true}
      />
    </div>
  );
}

export default App;
