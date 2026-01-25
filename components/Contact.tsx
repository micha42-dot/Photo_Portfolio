import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto pt-10 md:pt-20 animate-slide-up">
      <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-4">Let's create together.</h2>
      <p className="text-stone-500 font-light text-lg mb-12">
        Available for commissions worldwide.
      </p>

      {formState === 'success' ? (
        <div className="bg-stone-50 border border-stone-200 p-12 text-center">
          <h3 className="text-2xl font-serif text-stone-900 mb-2">Message Sent</h3>
          <p className="text-stone-500 font-light">Thank you for reaching out. I'll get back to you shortly.</p>
          <button 
            onClick={() => setFormState('idle')}
            className="mt-6 text-xs uppercase tracking-widest border-b border-stone-900 pb-1 hover:opacity-50"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="group">
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Name</label>
            <input 
              required
              type="text" 
              className="w-full border-b border-stone-200 py-3 text-xl font-light focus:outline-none focus:border-stone-900 transition-colors bg-transparent"
              placeholder="Your name"
            />
          </div>

          <div className="group">
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Email</label>
            <input 
              required
              type="email" 
              className="w-full border-b border-stone-200 py-3 text-xl font-light focus:outline-none focus:border-stone-900 transition-colors bg-transparent"
              placeholder="Your email address"
            />
          </div>

          <div className="group">
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Project Details</label>
            <textarea 
              required
              rows={4}
              className="w-full border-b border-stone-200 py-3 text-xl font-light focus:outline-none focus:border-stone-900 transition-colors bg-transparent resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={formState === 'submitting'}
              className="group flex items-center gap-4 text-sm uppercase tracking-widest hover:gap-6 transition-all duration-300 disabled:opacity-50"
            >
              {formState === 'submitting' ? 'Sending...' : 'Send Message'}
              <ArrowRight size={18} className="text-stone-900 group-hover:text-stone-600" />
            </button>
          </div>
        </form>
      )}

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-stone-100 pt-8">
        <div>
          <h5 className="text-xs uppercase tracking-widest font-bold mb-2">Representation</h5>
          <p className="text-stone-500 font-light text-sm">
            Artistry Agency<br/>
            hello@artistry.com<br/>
            +1 (555) 012-3456
          </p>
        </div>
        <div>
          <h5 className="text-xs uppercase tracking-widest font-bold mb-2">Studio</h5>
          <p className="text-stone-500 font-light text-sm">
            123 Arts District<br/>
            Los Angeles, CA 90013<br/>
            By appointment only
          </p>
        </div>
      </div>
    </div>
  );
};