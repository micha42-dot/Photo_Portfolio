export interface Photo {
  id: string;
  src: string;
  width?: number; // Optional, defaults to auto in CSS
  height?: number; // Optional
  title: string;
  client: string; // Used for the Category/Rubrik (Folder name)
  description: string;
  keywords: string[];
}

export type TabType = 'gallery' | 'about' | 'contact' | 'impressum';

export interface Project {
  id: string;
  label: string;
}

export interface GalleryManifestItem {
  filename: string;
  category: string;
}