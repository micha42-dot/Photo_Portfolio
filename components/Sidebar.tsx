import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { TabType } from '../types';
import { Search, Loader2 } from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  isMobileOpen: boolean;
  closeMobile: () => void;
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  isMobileOpen,
  closeMobile,
  onSearch,
  isSearching
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'gallery') {
      setActiveCategory('All');
    }
    closeMobile();
  };

  const handleProject = (projectId: string) => {
    setActiveCategory(projectId);
    setActiveTab('gallery');
    closeMobile();
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    setActiveTab('gallery');
    closeMobile();
  };

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-40 w-[280px] bg-white 
        flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:block md:h-screen md:sticky md:top-0
        border-r border-stone-100 overflow-hidden
      `}
    >
      <div className="flex flex-col h-full p-8 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="mb-10 flex-shrink-0">
          <h1 
            className="text-2xl font-extrabold tracking-tight cursor-pointer hover:opacity-70 transition-opacity text-stone-900 heading-font"
            onClick={() => handleNav('gallery')}
          >
            Michael Förtsch
          </h1>
          <p className="text-xs text-stone-500 mt-2 font-medium tracking-wide">PHOTOGRAPHY</p>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-8">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => handleNav('gallery')}
                className={`text-sm hover:text-stone-900 transition-colors ${activeTab === 'gallery' && activeCategory === 'All' ? 'font-bold text-stone-900' : 'text-stone-500'}`}
              >
                Übersicht
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNav('about')}
                className={`text-sm hover:text-stone-900 transition-colors ${activeTab === 'about' ? 'font-bold text-stone-900' : 'text-stone-500'}`}
              >
                About
              </button>
            </li>
             <li>
              <button 
                onClick={() => handleNav('contact')}
                className={`text-sm hover:text-stone-900 transition-colors ${activeTab === 'contact' ? 'font-bold text-stone-900' : 'text-stone-500'}`}
              >
                Kontakt
              </button>
            </li>
          </ul>

          {/* Categories List */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4 heading-font">Rubriken</h3>
            <ul className="space-y-3">
              {PROJECTS.filter(p => p.id !== 'All').map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => handleProject(project.id)}
                    className={`text-[14px] leading-tight text-left block hover:text-stone-900 transition-colors ${activeCategory === project.id && activeTab === 'gallery' ? 'text-black font-semibold' : 'text-stone-500'}`}
                  >
                    {project.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Search & Footer */}
        <div className="mt-10 flex-shrink-0 space-y-6">
           <div className="relative">
              <form onSubmit={submitSearch}>
                <input 
                  type="text" 
                  placeholder="Suchen..." 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full text-xs border-b border-stone-200 py-2 pr-6 focus:outline-none focus:border-stone-800 bg-transparent placeholder-stone-400 font-medium"
                />
                <button type="submit" className="absolute right-0 top-2 text-stone-400 hover:text-stone-800">
                  {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                </button>
              </form>
          </div>

          <div className="flex flex-col gap-2 text-stone-400">
            <div className="flex gap-4">
                <a href="#" className="hover:text-stone-900 transition-colors text-xs uppercase font-semibold">Instagram</a>
                <a href="#" className="hover:text-stone-900 transition-colors text-xs uppercase font-semibold">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};