export interface Property {
  id: string;
  tag: 'VILLA' | 'PENTHOUSE' | 'MANSION' | 'ESTATE';
  title: string;
  location: string;
  city: string;
  country: string;
  price: string;
  numericPrice: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  additionalImages?: string[];
  description: string;
  amenities: string[];
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: 'Villa' | 'Penthouse' | 'Interior' | 'Aerial';
  image: string;
}

export interface SearchFilterState {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}
