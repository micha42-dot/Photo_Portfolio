import React from 'react';

export const Impressum: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto pt-10 md:pt-16 animate-slide-up pb-20">
      <h2 className="text-3xl font-bold text-stone-900 mb-8 heading-font">Impressum</h2>
      
      <div className="space-y-8 text-stone-600 text-sm leading-relaxed">
        <div>
          <h3 className="font-bold text-stone-900 mb-2">Angaben gemäß § 5 TMG</h3>
          <p>
            Michael Förtsch Fotografie<br />
            Musterstraße 123<br />
            10115 Berlin<br />
            Deutschland
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-900 mb-2">Kontakt</h3>
          <p>
            Telefon: +49 (0) 123 456789<br />
            E-Mail: mail@michaelfoertsch.de
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-900 mb-2">Umsatzsteuer-ID</h3>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            DE 123 456 789
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-900 mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>
            Michael Förtsch<br />
            Musterstraße 123<br />
            10115 Berlin
          </p>
        </div>

        <div>
          <h3 className="font-bold text-stone-900 mb-2">Haftungsausschluss</h3>
          <p className="mb-2"><strong>Haftung für Inhalte</strong></p>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </div>
      </div>
    </div>
  );
};