import React, { useState } from 'react';
import { TabType } from '../types';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  categories?: string[]; // Made optional but expected from App
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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm w-full border-b border-stone-50">
      <div className="max-w-[1800px] mx-auto px-4 py-1 flex justify-between items-center h-12 md:h-14">
        {/* Logo */}
        <div 
          className="cursor-pointer z-50" 
          onClick={() => handleNav('gallery')}
        >
          <h1 className="text-lg md:text-xl font-extrabold tracking-widest uppercase heading-font text-stone-900">
            Michael Förtsch
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          <button 
            onClick={() => handleNav('gallery')}
            className={`text-[10px] md:text-xs font-medium tracking-widest uppercase hover:text-stone-500 transition-colors ${activeTab === 'gallery' && activeCategory === 'All' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Start
          </button>
          
          {/* Categories Dropdown - Only shows if we have categories */}
          {dropdownCategories.length > 0 && (
            <div className="relative group h-full flex items-center">
              <button 
                className={`text-[10px] md:text-xs font-medium tracking-widest uppercase hover:text-stone-500 transition-colors ${activeTab === 'gallery' && activeCategory !== 'All' ? 'text-stone-900' : 'text-stone-400'}`}
              >
                Portfolio
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-white border border-stone-100 shadow-xl p-4 flex flex-col gap-2 min-w-[180px] text-center">
                    {dropdownCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategory(cat)}
                        className="text-[10px] uppercase tracking-widest text-stone-500 hover:text-stone-900 whitespace-nowrap"
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
            className={`text-[10px] md:text-xs font-medium tracking-widest uppercase hover:text-stone-500 transition-colors ${activeTab === 'about' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Über Mich
          </button>
          
          <button 
            onClick={() => handleNav('contact')}
            className={`text-[10px] md:text-xs font-medium tracking-widest uppercase hover:text-stone-500 transition-colors ${activeTab === 'contact' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            Kontakt
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 p-1 text-stone-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <button onClick={() => handleNav('gallery')} className="text-xl font-medium uppercase tracking-widest">Start</button>
        <div className="flex flex-col items-center gap-4 py-4 border-y border-stone-100 w-full max-w-xs">
          {dropdownCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className="text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900"
            >
              {cat}
            </button>
          ))}
        </div>
        <button onClick={() => handleNav('about')} className="text-xl font-medium uppercase tracking-widest">Über Mich</button>
        <button onClick={() => handleNav('contact')} className="text-xl font-medium uppercase tracking-widest">Kontakt</button>
      </div>
    </header>
  );
};