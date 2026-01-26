import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50 py-16 mt-20 border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-xl md:text-2xl font-bold tracking-wide mb-4 brand-font">SUBSCRIBE</h2>
        <p className="text-gray-500 text-sm mb-8 font-light">
          Receive updates about upcoming limited prints and books.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Email Address" 
            className="flex-1 bg-white border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
          />
          <button 
            type="submit" 
            className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors uppercase"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-center gap-6 mb-8">
            {/* Social Icons (SVGs) */}
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-700 transition">
                 <span className="text-xs font-bold">IG</span>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-700 transition">
                 <span className="text-xs font-bold">TW</span>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-700 transition">
                 <span className="text-xs font-bold">BĒ</span>
            </a>
        </div>
        
        <p className="text-gray-400 text-xs tracking-wider">
          © {new Date().getFullYear()} MICHAEL FÖRTSCH. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};
