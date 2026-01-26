import React, { useState } from 'react';
import { Category } from '../types';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeCategory, onCategoryChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (category: Category) => {
    onCategoryChange(category);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm w-full border-b border-gray-100">
        {/* Reduced padding (py-4 instead of py-6) for a smaller header */}
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Brand Name - Bold, smaller text size */}
          <div className="flex-shrink-0 z-50">
            <h1 
              className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase text-black cursor-pointer hover:opacity-70 transition-opacity" 
              onClick={() => {
                onCategoryChange(Category.ALL);
                setIsMobileMenuOpen(false);
              }}
            >
              Michael Förtsch
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.value}>
                  <button
                    onClick={() => onCategoryChange(item.value)}
                    className={`text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                      activeCategory === item.value 
                        ? 'text-black' 
                        : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                  <button className="text-xs font-medium tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors ml-4">
                      Info
                  </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <button 
            className="md:hidden z-50 p-2 -mr-2 text-black focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-5 flex flex-col items-end gap-[5px]">
              <span className={`h-[2px] bg-black w-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`h-[2px] bg-black w-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] bg-black w-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-8 text-center">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.value}
              onClick={() => handleMobileNavClick(item.value)}
              className={`text-2xl font-light tracking-widest uppercase transition-transform duration-500 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <span className={`${activeCategory === item.value ? 'border-b border-black pb-1' : ''}`}>
                {item.label}
              </span>
            </button>
          ))}
          <button 
             className={`text-2xl font-light tracking-widest uppercase text-gray-400 mt-8 transition-transform duration-500 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
             }`}
             style={{ transitionDelay: `${NAV_ITEMS.length * 50}ms` }}
          >
            Info & Contact
          </button>
        </nav>
      </div>
    </>
  );
};