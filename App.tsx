import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Impressum } from './components/Impressum';
import { Lightbox } from './components/Lightbox';
import { Photo, TabType, GalleryManifestItem } from './types';
import { INITIAL_PHOTOS } from './constants';
import { searchPhotos } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('gallery');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]); 
  const [displayPhotos, setDisplayPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Dynamic categories based on loaded photos (Maintenance-free!)
  const categories = useMemo(() => {
    if (!allPhotos || allPhotos.length === 0) return ['All'];
    const cats = new Set(allPhotos.map(p => p.client).filter(Boolean));
    return ['All', ...Array.from(cats)].sort();
  }, [allPhotos]);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        // Use relative path './' for GitHub Pages compatibility
        const response = await fetch('./gallery.json'); 
        if (!response.ok) throw new Error('No manifest found');
        
        const manifest = await response.json();
        
        // If manifest is empty array (fallback from deploy script) or invalid
        if (!Array.isArray(manifest) || manifest.length === 0) {
            throw new Error('Manifest is empty');
        }
        
        const loadedPhotos: Photo[] = manifest
          .filter((item: any) => item && item.filename)
          .map((item: GalleryManifestItem, index: number) => {
            const category = item.category || 'Uncategorized';
            return {
              id: `img-${index}`,
              src: item.filename, 
              title: item.filename.split('/').pop()?.split('.')[0] || 'Untitled', 
              client: category, 
              description: '',
              keywords: [category.toLowerCase()]
            };
          });

        setAllPhotos(loadedPhotos);
        setIsDemoMode(false);
      } catch (error) {
        console.warn('Could not load gallery.json, falling back to demo data.', error);
        setAllPhotos(INITIAL_PHOTOS);
        setIsDemoMode(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadGallery();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setDisplayPhotos(allPhotos);
    } else if (activeCategory === 'Search Results') {
        // Handled by handleSearch
    } else {
      setDisplayPhotos(allPhotos.filter(p => p.client === activeCategory));
    }
  }, [activeCategory, allPhotos]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setActiveCategory('All'); 
      return;
    }

    try {
      const matchedIds = await searchPhotos(query, allPhotos);
      const filtered = allPhotos.filter(p => matchedIds.includes(p.id));
      setDisplayPhotos(filtered);
      setActiveCategory('Search Results');
    } catch (error) {
      console.error("Search failed", error);
    }
  };
  
  const currentLabel = activeCategory === 'All' ? 'Alle Arbeiten' : 
                       activeCategory === 'Search Results' ? 'Suchergebnisse' :
                       activeCategory;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-stone-900">
        <div className="animate-pulse text-xs tracking-widest uppercase">Loading Gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans flex flex-col">
      {isDemoMode && (
         <div className="bg-red-50 text-red-600 text-[10px] md:text-xs text-center py-2 px-4 uppercase tracking-widest font-bold border-b border-red-100">
            Demo Mode — Keine Bilder gefunden. Bitte lade Bilder in den 'images' Ordner auf GitHub.
         </div>
      )}
      
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories} 
      />

      <main className="flex-1 flex flex-col w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
          {activeTab === 'gallery' && (
            <Gallery 
              photos={displayPhotos} 
              onPhotoClick={setSelectedPhoto} 
              title={activeCategory === 'All' ? 'Overview' : currentLabel}
              isSearching={activeCategory === 'Search Results'}
            />
          )}
          {activeTab === 'about' && <About />}
          {activeTab === 'contact' && <Contact />}
          {activeTab === 'impressum' && <Impressum />}
      </main>

      <Footer onNav={setActiveTab} />

      {selectedPhoto && (
        <Lightbox 
            photo={selectedPhoto} 
            photos={displayPhotos} 
            onClose={() => setSelectedPhoto(null)} 
        />
      )}
    </div>
  );
};

export default App;