import React, { useState, useEffect } from 'react';
import { X, MapPin, Bed, Bath, Maximize2, Check, Phone, Mail, Calendar, Heart } from 'lucide-react';
import { Property } from '../types';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onScheduleViewing: (propertyTitle: string) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onScheduleViewing,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (property) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [property, onClose]);

  if (!property) return null;

  const allImages = [property.image, ...(property.additionalImages || [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#fbfaf8]">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded bg-stone-200/70 text-stone-700">
              {property.tag}
            </span>
            <span className="text-sm font-medium text-stone-500">
              Listing ID: #{property.id.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => onToggleFavorite(property.id, e)}
              className={`p-2 rounded-full border transition-colors ${
                isFavorite
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
              title={isFavorite ? 'Saved to favorites' : 'Save property'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Photo Viewer */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-900 shadow-md">
              <img
                src={allImages[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center space-x-2.5 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#be9870] ring-2 ring-[#be9870]/20'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-100 pb-5 gap-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
                {property.title}
              </h2>
              <div className="flex items-center text-stone-500 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1 text-[#be9870]" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-xs text-stone-400 block font-light">Asking Price</span>
              <span className="font-serif text-3xl font-normal text-stone-900 text-[#be9870]">
                {property.price}
              </span>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-4 bg-stone-50 rounded-xl p-4 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <Bed className="w-5 h-5 text-stone-500 mb-1" />
              <span className="text-xs text-stone-400 uppercase tracking-wider">Bedrooms</span>
              <span className="text-base font-semibold text-stone-900 mt-0.5">{property.beds} Suites</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border-x border-stone-200/60">
              <Bath className="w-5 h-5 text-stone-500 mb-1" />
              <span className="text-xs text-stone-400 uppercase tracking-wider">Bathrooms</span>
              <span className="text-base font-semibold text-stone-900 mt-0.5">{property.baths} Baths</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <Maximize2 className="w-5 h-5 text-stone-500 mb-1" />
              <span className="text-xs text-stone-400 uppercase tracking-wider">Living Area</span>
              <span className="text-base font-semibold text-stone-900 mt-0.5">
                {property.sqft.toLocaleString()} sq ft
              </span>
            </div>
          </div>

          {/* Overview Story */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Architectural Overview
            </h4>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Curated Amenities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
              Residence Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2.5 text-xs sm:text-sm text-stone-700 bg-stone-50/70 p-2.5 rounded-lg border border-stone-100"
                >
                  <span className="w-5 h-5 rounded-full bg-[#be9870]/20 flex items-center justify-center text-[#be9870] shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Broker Contact & Tour Action */}
          <div className="bg-[#10141a] text-white rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#be9870] text-stone-900 flex items-center justify-center font-serif text-lg font-bold">
                {property.agent.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <span className="text-[10px] text-[#be9870] uppercase tracking-wider font-semibold block">
                  Exclusive Representative
                </span>
                <h5 className="font-medium text-white text-base">
                  {property.agent.name}
                </h5>
                <p className="text-xs text-stone-400">{property.agent.role}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-stone-300">
                  <a href={`tel:${property.agent.phone}`} className="inline-flex items-center hover:text-white">
                    <Phone className="w-3 h-3 mr-1 text-[#be9870]" />
                    {property.agent.phone}
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="inline-flex items-center hover:text-white">
                    <Mail className="w-3 h-3 mr-1 text-[#be9870]" />
                    Email
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onScheduleViewing(property.title);
              }}
              className="w-full md:w-auto bg-[#be9870] hover:bg-[#ad845b] text-[#1c1917] font-medium text-sm px-6 py-3 rounded-lg inline-flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Private Tour</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
