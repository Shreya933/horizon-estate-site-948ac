import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { Property } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  properties,
  onSelectProperty,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? properties.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.location.toLowerCase().includes(query.toLowerCase()) ||
          p.tag.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : properties;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Search Container */}
      <div className="relative z-10 w-full max-w-2xl bg-[#12161f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-[#be9870] mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, property name, or architectural style..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-stone-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-white mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-white/5">
          {filtered.length > 0 ? (
            filtered.map((property) => (
              <div
                key={property.id}
                onClick={() => {
                  onClose();
                  onSelectProperty(property);
                }}
                className="py-3 px-3 rounded-xl hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-14 h-11 rounded-lg overflow-hidden bg-stone-800 shrink-0">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#be9870] uppercase font-semibold tracking-wider">
                      {property.tag}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-white group-hover:text-[#be9870] transition-colors">
                      {property.title}
                    </h4>
                    <div className="flex items-center text-xs text-stone-400 mt-0.5">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-white">
                    {property.price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-[#be9870] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-stone-400 text-sm">
              No luxury residences match &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
