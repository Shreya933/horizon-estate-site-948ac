import React from 'react';
import { Heart, MapPin, Bed, Bath, Maximize2 } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  return (
    <div
      onClick={() => onSelectProperty(property)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelectProperty(property);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${property.title}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-stone-200/70 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Favorite Button (Heart) */}
        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => onToggleFavorite(property.id, e)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isFavorite
               ? 'bg-[#be9870] text-[#171411] shadow-md scale-105'
              : 'bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavorite ? 'fill-current scale-110' : 'stroke-[2]'
            }`}
          />
        </button>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Property Category Tag */}
          <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-stone-400 block mb-1">
            {property.tag}
          </span>

          {/* Property Title */}
          <h3 className="font-serif text-[17px] font-normal text-stone-900 group-hover:text-[#be9870] transition-colors leading-snug line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-stone-500 text-[12px] mt-1 mb-2.5">
            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0 text-stone-400" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Price */}
          <div className="text-[17px] font-semibold text-stone-900 tracking-tight mb-3">
            {property.price}
          </div>
        </div>

        {/* Amenities Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-stone-600 text-[11.5px] font-medium">
          <div className="flex items-center space-x-1.5">
            <Bed className="w-3.5 h-3.5 text-stone-400" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Bath className="w-3.5 h-3.5 text-stone-400" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
            <span>{property.sqft.toLocaleString()} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
};
