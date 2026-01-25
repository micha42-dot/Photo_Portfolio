import { Photo, Project } from './types';

export const PROJECTS: Project[] = [
  { id: 'All', label: 'Overview' },
  { id: 'Portraits', label: 'Portraits' },
  { id: 'Landscape', label: 'Landscape & Nature' },
  { id: 'Architecture', label: 'City & Architecture' },
  { id: 'Cinematic', label: 'Cinematic' },
  { id: 'Automotive', label: 'Automotive' },
];

export const INITIAL_PHOTOS: Photo[] = [
  {
    id: '1',
    src: 'https://picsum.photos/id/64/800/1200',
    width: 800,
    height: 1200,
    title: 'Neon Portrait',
    client: 'Portraits',
    description: 'Study in artificial light.',
    keywords: ['portrait', 'woman', 'neon', 'light', 'studio']
  },
  {
    id: '2',
    src: 'https://picsum.photos/id/1036/1200/800',
    width: 1200,
    height: 800,
    title: 'Alpine Pass',
    client: 'Landscape',
    description: 'Morning mood in the Dolomites.',
    keywords: ['nature', 'mountains', 'fog', 'morning', 'landscape']
  },
  {
    id: '3',
    src: 'https://picsum.photos/id/122/800/600',
    width: 800,
    height: 600,
    title: 'Concrete Jungle',
    client: 'Architecture',
    description: 'Modernist architecture in Berlin.',
    keywords: ['city', 'berlin', 'architecture', 'concrete', 'lines']
  },
  {
    id: '4',
    src: 'https://picsum.photos/id/338/800/1200',
    width: 800,
    height: 1200,
    title: 'Metro Noir',
    client: 'Cinematic',
    description: 'Cinematic scene in the subway.',
    keywords: ['cinematic', 'subway', 'dark', 'mood', 'filmlook']
  },
  {
    id: '5',
    src: 'https://picsum.photos/id/1071/1200/800',
    width: 1200,
    height: 800,
    title: 'Vintage 911',
    client: 'Automotive',
    description: 'Classic on a country road.',
    keywords: ['car', 'porsche', 'vintage', 'oldtimer', 'road']
  },
  {
    id: '6',
    src: 'https://picsum.photos/id/435/800/1100',
    width: 800,
    height: 1100,
    title: 'The Writer',
    client: 'Portraits',
    description: 'Editorial portrait for a magazine.',
    keywords: ['man', 'portrait', 'editorial', 'bw']
  },
  {
    id: '7',
    src: 'https://picsum.photos/id/188/1200/800',
    width: 1200,
    height: 800,
    title: 'Skyline Reflections',
    client: 'Architecture',
    description: 'Reflections in a glass facade.',
    keywords: ['architecture', 'glass', 'skyscraper', 'city', 'blue']
  },
  {
    id: '8',
    src: 'https://picsum.photos/id/133/1200/800',
    width: 1200,
    height: 800,
    title: 'Speed',
    client: 'Automotive',
    description: 'Dynamic shot at night.',
    keywords: ['car', 'night', 'lights', 'speed', 'automotive']
  },
  {
    id: '9',
    src: 'https://picsum.photos/id/299/1200/800',
    width: 1200,
    height: 800,
    title: 'Lost Highway',
    client: 'Cinematic',
    description: 'Lonely road in twilight.',
    keywords: ['road', 'cinematic', 'dark', 'travel', 'film']
  },
  {
    id: '10',
    src: 'https://picsum.photos/id/10/1000/600',
    width: 1000,
    height: 600,
    title: 'Forest Edge',
    client: 'Landscape',
    description: 'Light play at the forest edge.',
    keywords: ['forest', 'nature', 'trees', 'green', 'calm']
  },
  {
    id: '11',
    src: 'https://picsum.photos/id/349/1200/800',
    width: 1200,
    height: 800,
    title: 'City Rain',
    client: 'Cinematic',
    description: 'Rainy day in the big city.',
    keywords: ['rain', 'city', 'cinematic', 'moody', 'window']
  },
  {
    id: '12',
    src: 'https://picsum.photos/id/447/900/900',
    width: 900,
    height: 900,
    title: 'Bauhaus Details',
    client: 'Architecture',
    description: 'Geometric shapes and shadows.',
    keywords: ['architecture', 'white', 'shadow', 'minimalism']
  },
  {
    id: '13',
    src: 'https://picsum.photos/id/669/800/1000',
    width: 800,
    height: 1000,
    title: 'Studio Light',
    client: 'Portraits',
    description: 'High-key studio shot.',
    keywords: ['portrait', 'studio', 'bright', 'fashion']
  },
  {
    id: '14',
    src: 'https://picsum.photos/id/111/1200/800',
    width: 1200,
    height: 800,
    title: 'Dashboard',
    client: 'Automotive',
    description: 'Interior detail shot.',
    keywords: ['car', 'interior', 'leather', 'details', 'luxury']
  }
];