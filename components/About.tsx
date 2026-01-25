import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
          <img 
            src="https://picsum.photos/id/447/800/1200" 
            alt="Michael Förtsch Portrait" 
            className="w-full h-full object-cover grayscale contrast-110"
          />
        </div>
        
        <div className="pt-8 md:pt-12 space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight heading-font">
            Perspektiven verändern.
          </h2>
          
          <div className="space-y-6 text-stone-600 font-normal leading-relaxed text-base">
            <p>
              Ich bin Michael Förtsch, Fotograf aus Deutschland. Meine Arbeit konzentriert sich auf die Schnittstelle zwischen Mensch und Umgebung. Egal ob in der unberührten Natur, der dichten Architektur der Großstadt oder im inszenierten Licht des Studios.
            </p>
            <p>
              Mit einem Fokus auf klare Linien und emotionale Tiefe versuche ich, in jedem Bild eine Geschichte zu erzählen. Meine Spezialisierung liegt in den Bereichen Automotive, Architektur und Portrait.
            </p>
            <p>
              Dieses Portfolio zeigt eine kuratierte Auswahl meiner freien und beauftragten Arbeiten.
            </p>
          </div>

          <div className="pt-8 border-t border-stone-100 grid grid-cols-2 gap-8">
            <div>
              <h4 className="uppercase text-xs tracking-widest font-bold mb-4 text-stone-900">Kunden</h4>
              <ul className="text-sm text-stone-500 space-y-2 font-medium">
                <li>Porsche Design</li>
                <li>BMW Group</li>
                <li>Architectural Digest</li>
                <li>GQ Germany</li>
                <li>Lufthansa</li>
              </ul>
            </div>
            <div>
              <h4 className="uppercase text-xs tracking-widest font-bold mb-4 text-stone-900">Fokus</h4>
              <ul className="text-sm text-stone-500 space-y-2 font-medium">
                <li>Automotive Photography</li>
                <li>High-End Retouching</li>
                <li>Creative Direction</li>
                <li>Location Scouting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};