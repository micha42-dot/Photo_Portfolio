import React from 'react';
import { TabType } from '../types';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNav: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNav }) => {
  return (
    <footer className="w-full bg-white py-20 mt-auto border-t border-stone-50">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end md:items-center gap-12">
        
        {/* Left: Credits */}
        <div className="text-left space-y-4">
           <h3 className="text-sm font-bold tracking-widest uppercase heading-font text-stone-900">Michael Förtsch</h3>
           <p className="text-[10px] text-stone-400 uppercase tracking-widest">
             Photography & Direction<br/>
             Based in Berlin, Germany
           </p>
        </div>

        {/* Right: Socials & External */}
        <div className="flex flex-col items-end gap-6">
           <a 
              href="https://michaelfoertsch.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900 hover:text-stone-500 transition-colors"
            >
              michaelfoertsch.de
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>

           <div className="flex gap-6 items-center">
             <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
             <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors"><Linkedin size={18} strokeWidth={1.5} /></a>
             <span className="h-4 w-px bg-stone-200"></span>
             <button onClick={() => { onNav('impressum'); window.scrollTo(0,0); }} className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900">Impressum</button>
           </div>
        </div>
      </div>
    </footer>
  );
};