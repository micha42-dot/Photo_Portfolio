import React, { useState } from 'react';
import { TabType } from '../types';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  categories?: string[]; 
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  categories = [] 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'gallery') {
      setActiveCategory('All');
    }
    setIsMobileMenuOpen(false);
  };

  const handleCategory = (catId: string) => {
    setActiveCategory(catId);
    setActiveTab('gallery');
    setIsMobileMenuOpen(false);
  };

  // Filter out 'All' and 'Search Results' for the dropdown
  const dropdownCategories = categories.filter(c => c !== 'All' && c !== 'Search Results');

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md w-full border-b border-stone-100">
      <div className="max-w-[1800px] mx-auto px-4 flex justify-between items-center h-10 md:h-12">
        {/* Logo */}
        <div 
          className="cursor-pointer z-50 flex items-center h-full" 
          onClick={() => handleNav('gallery')}
        >
          <h1 className="text-base md:text-lg font-bold tracking-widest uppercase heading-font text-stone-900 leading-none">
            Michael Förtsch
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
          <button 
            onClick={() => handleNav('gallery')}
            className={`text-[10px] font-medium tracking-widest uppercase hover:text-stone-500 transition-colors h-full flex items-center ${activeTab === 'gallery' && activeCategory === 'All' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Start
          </button>
          
          {/* Categories Dropdown */}
          {dropdownCategories.length > 0 && (
            <div className="relative group h-full flex items-center">
              <button 
                className={`text-[10px] font-medium tracking-widest uppercase hover:text-stone-500 transition-colors h-full flex items-center ${activeTab === 'gallery' && activeCategory !== 'All' ? 'text-stone-900' : 'text-stone-400'}`}
              >
                Portfolio
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white border border-stone-100 shadow-lg p-3 flex flex-col gap-2 min-w-[160px] text-center mt-1">
                    {dropdownCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategory(cat)}
                        className="text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 whitespace-nowrap py-1"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
              </div>
            </div>
          )}

          <button 
            onClick={() => handleNav('about')}
            className={`text-[10px] font-medium tracking-widest uppercase hover:text-stone-500 transition-colors h-full flex items-center ${activeTab === 'about' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Über Mich
          </button>
          
          <button 
            onClick={() => handleNav('contact')}
            className={`text-[10px] font-medium tracking-widest uppercase hover:text-stone-500 transition-colors h-full flex items-center ${activeTab === 'contact' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Kontakt
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 p-1 text-stone-900 flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-6 transition-transform duration-300 md:hidden
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <button onClick={() => handleNav('gallery')} className="text-lg font-medium uppercase tracking-widest">Start</button>
        <div className="flex flex-col items-center gap-3 py-4 border-y border-stone-100 w-full max-w-xs">
          {dropdownCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900"
            >
              {cat}
            </button>
          ))}
        </div>
        <button onClick={() => handleNav('about')} className="text-lg font-medium uppercase tracking-widest">Über Mich</button>
        <button onClick={() => handleNav('contact')} className="text-lg font-medium uppercase tracking-widest">Kontakt</button>
      </div>
    </header>
  );
};