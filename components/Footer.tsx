import React from 'react';
import { TabType } from '../types';
import { Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNav: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNav }) => {
  return (
    <footer className="w-full bg-stone-50 py-16 md:py-24 mt-auto">
      <div className="max-w-[1800px] mx-auto px-6 flex flex-col items-center gap-12">
        
        {/* Journalism / Cross-Link Section */}
        <div className="w-full max-w-lg text-center space-y-6">
          <h3 className="text-xl font-bold heading-font text-stone-900">Journalismus</h3>
          <p className="text-stone-500 text-sm leading-relaxed font-medium">
            Michael fotografiert nicht nur, sondern schreibt auch Sachen über Technologie, AI, Kultur und Science Fiction ins Internet.
          </p>
          
          <div className="pt-2">
            <a 
              href="https://michaelfoertsch.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-stone-700 transition-all hover:gap-4"
            >
              michaelfoertsch.de
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Socials & Links */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-stone-200 pt-12 gap-8">
           <div className="flex gap-6">
             <a href="#" className="p-2 bg-black text-white rounded-full hover:opacity-80 transition-opacity"><Instagram size={16} /></a>
             <a href="#" className="p-2 bg-black text-white rounded-full hover:opacity-80 transition-opacity"><Twitter size={16} /></a>
             <a href="#" className="p-2 bg-black text-white rounded-full hover:opacity-80 transition-opacity"><Linkedin size={16} /></a>
           </div>

           <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium text-stone-500">
             <button onClick={() => { onNav('impressum'); window.scrollTo(0,0); }} className="hover:text-stone-900">Impressum</button>
             <button onClick={() => { onNav('contact'); window.scrollTo(0,0); }} className="hover:text-stone-900">Kontakt</button>
           </div>
        </div>
      </div>
    </footer>
  );
};