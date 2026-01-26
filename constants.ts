import { Category, Photo } from './types';

// NOTE: Since browsers cannot automatically scan server folders, 
// you map your folder structure here.
// Example: if you have a file at /public/images/landscape/mountains.jpg
// You would add: { id: '1', src: '/images/landscape/mountains.jpg', category: Category.LANDSCAPE }

export const NAV_ITEMS = [
  { label: 'LANDSCAPE', value: Category.LANDSCAPE },
  { label: 'URBAN', value: Category.URBAN },
  { label: 'PORTRAITS', value: Category.PORTRAIT },
  { label: 'CONCEPTUAL', value: Category.CONCEPTUAL },
];

// Using Lorem Picsum for demo purposes to ensure the app looks good immediately.
// Replace 'src' with your local paths e.g., './images/landscape/01.jpg'
export const PORTFOLIO_IMAGES: Photo[] = [
  // LANDSCAPES
  {
    id: 'l1',
    category: Category.LANDSCAPE,
    src: 'https://picsum.photos/800/1200?random=1',
    title: 'Misty Morning'
  },
  {
    id: 'l2',
    category: Category.LANDSCAPE,
    src: 'https://picsum.photos/1200/800?random=2',
    title: 'The Lonely Tree'
  },
  {
    id: 'l3',
    category: Category.LANDSCAPE,
    src: 'https://picsum.photos/800/800?random=3',
    title: 'Highlands'
  },
  {
    id: 'l4',
    category: Category.LANDSCAPE,
    src: 'https://picsum.photos/900/1400?random=4',
    title: 'Valley Fog'
  },
  
  // URBAN
  {
    id: 'u1',
    category: Category.URBAN,
    src: 'https://picsum.photos/800/1100?random=5',
    title: 'Neon Nights'
  },
  {
    id: 'u2',
    category: Category.URBAN,
    src: 'https://picsum.photos/1200/900?random=6',
    title: 'Street Corner'
  },
  {
    id: 'u3',
    category: Category.URBAN,
    src: 'https://picsum.photos/700/1000?random=7',
    title: 'Subway'
  },

  // PORTRAITS
  {
    id: 'p1',
    category: Category.PORTRAIT,
    src: 'https://picsum.photos/800/1000?random=8',
    title: 'Stranger in Blue'
  },
  {
    id: 'p2',
    category: Category.PORTRAIT,
    src: 'https://picsum.photos/900/1200?random=9',
    title: 'Silhouette'
  },
  
  // CONCEPTUAL
  {
    id: 'c1',
    category: Category.CONCEPTUAL,
    src: 'https://picsum.photos/1000/1000?random=10',
    title: 'Abstract Thoughts'
  },
  {
    id: 'c2',
    category: Category.CONCEPTUAL,
    src: 'https://picsum.photos/1100/700?random=11',
    title: 'Dreams'
  },
  {
    id: 'c3',
    category: Category.CONCEPTUAL,
    src: 'https://picsum.photos/800/1300?random=12',
    title: 'The Void'
  },
];