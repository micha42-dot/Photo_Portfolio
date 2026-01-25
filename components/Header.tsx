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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm w-full">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex justify-between items-center h-20 md:h-24">
        {/* Logo - Strictly Left Aligned */}
        <div 
          className="cursor-pointer z-50 flex items-center h-full" 
          onClick={() => handleNav('gallery')}
        >
          <h1 className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase heading-font text-stone-900 leading-none hover:opacity-60 transition-opacity">
            Michael Förtsch
          </h1>
        </div>

        {/* Desktop Nav - Strictly Right Aligned */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 h-full">
          <button 
            onClick={() => handleNav('gallery')}
            className={`text-[11px] font-semibold tracking-[0.15em] uppercase hover:text-stone-500 transition-colors ${activeTab === 'gallery' && activeCategory === 'All' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Overview
          </button>
          
          {/* Categories Dropdown */}
          {dropdownCategories.length > 0 && (
            <div className="relative group h-full flex items-center">
              <button 
                className={`text-[11px] font-semibold tracking-[0.15em] uppercase hover:text-stone-500 transition-colors ${activeTab === 'gallery' && activeCategory !== 'All' ? 'text-stone-900' : 'text-stone-400'}`}
              >
                Portfolio
              </button>
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                  <div className="bg-white border border-stone-100 shadow-sm p-4 flex flex-col gap-3 min-w-[180px] text-right">
                    {dropdownCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategory(cat)}
                        className="text-[10px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-900 whitespace-nowrap font-medium transition-colors"
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
            className={`text-[11px] font-semibold tracking-[0.15em] uppercase hover:text-stone-500 transition-colors ${activeTab === 'about' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Info
          </button>
          
          <button 
            onClick={() => handleNav('contact')}
            className={`text-[11px] font-semibold tracking-[0.15em] uppercase hover:text-stone-500 transition-colors ${activeTab === 'contact' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 p-1 text-stone-900 flex items-center hover:opacity-50 transition-opacity"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Full Screen White */}
      <div 
        className={`
          fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <button onClick={() => handleNav('gallery')} className="text-xl font-light uppercase tracking-[0.2em]">Overview</button>
        <div className="flex flex-col items-center gap-4 py-6 border-y border-stone-100 w-full max-w-[200px]">
          {dropdownCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className="text-xs uppercase tracking-[0.15em] text-stone-500 hover:text-stone-900 font-medium"
            >
              {cat}
            </button>
          ))}
        </div>
        <button onClick={() => handleNav('about')} className="text-xl font-light uppercase tracking-[0.2em]">Info</button>
        <button onClick={() => handleNav('contact')} className="text-xl font-light uppercase tracking-[0.2em]">Contact</button>
      </div>
    </header>
  );
};