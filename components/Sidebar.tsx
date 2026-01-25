import React, { useState } from 'react';
import { TabType } from '../types';
import { Search, Loader2, X } from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  isMobileOpen: boolean;
  closeMobile: () => void;
  onSearch: (query: string) => void;
  isSearching: boolean;
  categories: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  isMobileOpen,
  closeMobile,
  onSearch,
  isSearching,
  categories
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'gallery') {
      setActiveCategory('All');
    }
    closeMobile();
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setActiveTab('gallery');
    closeMobile();
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    setActiveTab('gallery');
    closeMobile();
  };

  const displayCategories = categories.filter(c => c !== 'All' && c !== 'Search Results');

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobile}
        />
      )}

      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-[260px] bg-white 
          flex flex-col justify-between transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative md:block md:h-screen md:sticky md:top-0
          border-r border-stone-100 overflow-hidden
        `}
      >
        <div className="absolute top-4 right-4 md:hidden">
          <button onClick={closeMobile} className="p-2 text-stone-400 hover:text-stone-900">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col h-full p-8 md:p-10 overflow-y-auto no-scrollbar">
          {/* Header */}
          <div className="mb-12 flex-shrink-0 pt-4 md:pt-0">
            <h1 
              className="text-2xl md:text-3xl font-medium tracking-wide cursor-pointer hover:opacity-60 transition-opacity text-stone-900 heading-font leading-none"
              onClick={() => handleNav('gallery')}
            >
              Michael<br/>Förtsch
            </h1>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-10">
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNav('gallery')}
                  className={`text-sm uppercase tracking-widest transition-colors ${activeTab === 'gallery' && activeCategory === 'All' ? 'font-bold text-stone-900' : 'text-stone-400 hover:text-stone-800'}`}
                >
                  Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')}
                  className={`text-sm uppercase tracking-widest transition-colors ${activeTab === 'about' ? 'font-bold text-stone-900' : 'text-stone-400 hover:text-stone-800'}`}
                >
                  About
                </button>
              </li>
               <li>
                <button 
                  onClick={() => handleNav('contact')}
                  className={`text-sm uppercase tracking-widest transition-colors ${activeTab === 'contact' ? 'font-bold text-stone-900' : 'text-stone-400 hover:text-stone-800'}`}
                >
                  Contact
                </button>
              </li>
            </ul>

            {/* Categories List */}
            {displayCategories.length > 0 && (
              <div className="pt-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-300 mb-4">Portfolio</h3>
                <ul className="space-y-2">
                  {displayCategories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategory(cat)}
                        className={`text-sm font-serif italic text-left block transition-colors ${activeCategory === cat && activeTab === 'gallery' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>

          {/* Search & Footer */}
          <div className="mt-12 flex-shrink-0 space-y-8">
             <div className="relative">
                <form onSubmit={submitSearch}>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full text-sm font-serif italic border-b border-stone-200 py-2 pr-6 focus:outline-none focus:border-stone-800 bg-transparent placeholder-stone-300 text-stone-600"
                  />
                  <button type="submit" className="absolute right-0 top-2 text-stone-300 hover:text-stone-800 transition-colors">
                    {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                  </button>
                </form>
            </div>

            <div className="flex flex-col gap-1 text-stone-400">
              <div className="flex gap-4">
                  <a href="#" className="hover:text-stone-900 transition-colors text-[10px] uppercase tracking-widest">Instagram</a>
                  <a href="#" className="hover:text-stone-900 transition-colors text-[10px] uppercase tracking-widest">LinkedIn</a>
              </div>
              <p className="text-[10px] text-stone-300 mt-2">© 2024 Michael Förtsch</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};