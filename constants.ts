import { Photo, Project } from './types';

export const PROJECTS: Project[] = [
  { id: 'All', label: 'Alle Arbeiten' },
  { id: 'Portraits', label: 'Portraits' },
  { id: 'Landschaft', label: 'Landschaft & Natur' },
  { id: 'Stadt', label: 'Stadt & Architektur' },
  { id: 'Cinematic', label: 'Cinematic Photography' },
  { id: 'Automotiv', label: 'Automotiv' },
];

export const INITIAL_PHOTOS: Photo[] = [
  {
    id: '1',
    src: 'https://picsum.photos/id/64/800/1200',
    width: 800,
    height: 1200,
    title: 'Neon Portrait',
    client: 'Portraits',
    description: 'Studie im künstlichen Licht.',
    keywords: ['portrait', 'frau', 'neon', 'licht', 'studio']
  },
  {
    id: '2',
    src: 'https://picsum.photos/id/1036/1200/800',
    width: 1200,
    height: 800,
    title: 'Alpine Pass',
    client: 'Landschaft',
    description: 'Morgenstimmung in den Dolomiten.',
    keywords: ['natur', 'berge', 'nebel', 'morgen', 'landschaft']
  },
  {
    id: '3',
    src: 'https://picsum.photos/id/122/800/600',
    width: 800,
    height: 600,
    title: 'Concrete Jungle',
    client: 'Stadt',
    description: 'Modernistische Architektur in Berlin.',
    keywords: ['stadt', 'berlin', 'architektur', 'beton', 'linien']
  },
  {
    id: '4',
    src: 'https://picsum.photos/id/338/800/1200',
    width: 800,
    height: 1200,
    title: 'Metro Noir',
    client: 'Cinematic',
    description: 'Filmische Szene in der U-Bahn.',
    keywords: ['cinematic', 'ubahn', 'dunkel', 'stimmung', 'filmlook']
  },
  {
    id: '5',
    src: 'https://picsum.photos/id/1071/1200/800',
    width: 1200,
    height: 800,
    title: 'Vintage 911',
    client: 'Automotiv',
    description: 'Klassiker auf der Landstraße.',
    keywords: ['auto', 'porsche', 'vintage', 'oldtimer', 'straße']
  },
  {
    id: '6',
    src: 'https://picsum.photos/id/435/800/1100',
    width: 800,
    height: 1100,
    title: 'The Writer',
    client: 'Portraits',
    description: 'Redaktionelles Portrait für ein Magazin.',
    keywords: ['mann', 'portrait', 'editorial', 'schwarzweiss']
  },
  {
    id: '7',
    src: 'https://picsum.photos/id/188/1200/800',
    width: 1200,
    height: 800,
    title: 'Skyline Reflections',
    client: 'Stadt',
    description: 'Spiegelungen in der Glasfassade.',
    keywords: ['architektur', 'glas', 'wolkenkratzer', 'stadt', 'blau']
  },
  {
    id: '8',
    src: 'https://picsum.photos/id/133/1200/800',
    width: 1200,
    height: 800,
    title: 'Speed',
    client: 'Automotiv',
    description: 'Dynamische Aufnahme bei Nacht.',
    keywords: ['auto', 'nacht', 'lichter', 'geschwindigkeit', 'automotiv']
  },
  {
    id: '9',
    src: 'https://picsum.photos/id/299/1200/800',
    width: 1200,
    height: 800,
    title: 'Lost Highway',
    client: 'Cinematic',
    description: 'Einsame Straße im Zwielicht.',
    keywords: ['straße', 'cinematic', 'dunkel', 'reise', 'film']
  },
  {
    id: '10',
    src: 'https://picsum.photos/id/10/1000/600',
    width: 1000,
    height: 600,
    title: 'Forest Edge',
    client: 'Landschaft',
    description: 'Lichtspiel am Waldrand.',
    keywords: ['wald', 'natur', 'bäume', 'grün', 'ruhe']
  },
  {
    id: '11',
    src: 'https://picsum.photos/id/349/1200/800',
    width: 1200,
    height: 800,
    title: 'City Rain',
    client: 'Cinematic',
    description: 'Regnerischer Tag in der Großstadt.',
    keywords: ['regen', 'stadt', 'cinematic', 'moody', 'fenster']
  },
  {
    id: '12',
    src: 'https://picsum.photos/id/447/900/900',
    width: 900,
    height: 900,
    title: 'Bauhaus Details',
    client: 'Stadt',
    description: 'Geometrische Formen und Schatten.',
    keywords: ['architektur', 'weiss', 'schatten', 'minimalismus']
  },
  {
    id: '13',
    src: 'https://picsum.photos/id/669/800/1000',
    width: 800,
    height: 1000,
    title: 'Studio Light',
    client: 'Portraits',
    description: 'High-Key Studioaufnahme.',
    keywords: ['portrait', 'studio', 'hell', 'fashion']
  },
  {
    id: '14',
    src: 'https://picsum.photos/id/111/1200/800',
    width: 1200,
    height: 800,
    title: 'Dashboard',
    client: 'Automotiv',
    description: 'Detailaufnahme Interieur.',
    keywords: ['auto', 'innenraum', 'leder', 'details', 'luxus']
  }
];