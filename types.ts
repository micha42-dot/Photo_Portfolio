export enum Category {
  ALL = 'All',
  LANDSCAPE = 'landscape',
  URBAN = 'urban',
  PORTRAIT = 'portrait',
  CONCEPTUAL = 'conceptual'
}

export interface Photo {
  id: string;
  src: string; // The URL/Path to the image
  category: Category;
  title?: string;
  width?: number; // Optional aspect ratio helper
  height?: number;
}
