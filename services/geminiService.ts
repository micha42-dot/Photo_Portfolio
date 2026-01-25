import { Photo } from "../types";

export const searchPhotos = async (query: string, photos: Photo[]): Promise<string[]> => {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return photos.map(p => p.id);

  const matchedPhotos = photos.filter(photo => {
    // Search in Title
    if (photo.title && photo.title.toLowerCase().includes(lowerQuery)) return true;
    // Search in Description
    if (photo.description && photo.description.toLowerCase().includes(lowerQuery)) return true;
    // Search in Keywords
    if (photo.keywords && photo.keywords.some(k => k.toLowerCase().includes(lowerQuery))) return true;
    // Search in Category/Client
    if (photo.client.toLowerCase().includes(lowerQuery)) return true;
    
    return false;
  });

  return matchedPhotos.map(p => p.id);
};