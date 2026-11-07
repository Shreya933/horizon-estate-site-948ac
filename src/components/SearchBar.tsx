import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Home, DollarSign, Bed, ChevronDown, ArrowRight, Check } from 'lucide-react';
import { SearchFilterState } from '../types';

interface SearchBarProps {
  filters: SearchFilterState;
  onFilterChange: (filters: SearchFilterState) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onFilterChange,
  onSearch,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const locationOptions = [
    'Any location',
    'Malibu, California',
    'Los Angeles, California',
    'Dubai, UAE',
    'Goa, India',
  ];

  const typeOptions = ['Any type', 'Villa', 'Penthouse', 'Mansion'];

  const priceOptions = [
    'Any price',
    'Under $3,000,000',
    '$3,000,000 - $5,000,000',
    '$5,000,000 - $10,000,000',
  ];

  const bedroomOptions = ['Any', '3 Bedrooms', '4 Bedrooms', '5+ Bedrooms'];

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleSelect = (key: keyof SearchFilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
    setOpenDropdown(null);
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl bg-[#13171e]/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.4)] rounded-xl p-1.5 sm:p-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1.5 lg:gap-0 lg:divide-x lg:divide-white/10 items-center">
        {/* Location Filter */}
        <div className="relative px-2.5 sm:px-3 py-1.5 hover:bg-white/[0.04] rounded-lg transition-colors cursor-pointer">
          <button
            type="button"
            onClick={() => toggleDropdown('location')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0 text-[#be9870]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9.5px] uppercase tracking-wider text-stone-400 font-semibold leading-tight">
                  Location
                </span>
                <span className="block text-[12.5px] font-medium text-white truncate leading-snug">
                  {filters.location || 'Any location'}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-400 ml-1.5 shrink-0 transition-transform ${
                openDropdown === 'location' ? 'rotate-180 text-white' : ''
              }`}
            />
          </button>

          {/* Location Dropdown */}
          {openDropdown === 'location' && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-[#161b24] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              {locationOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect('location', opt)}
                  className="w-full text-left px-3 py-1.5 text-xs text-stone-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                >
                  <span>{opt}</span>
                  {filters.location === opt && (
                    <Check className="w-3.5 h-3.5 text-[#be9870]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Type Filter */}
        <div className="relative px-2.5 sm:px-3 py-1.5 hover:bg-white/[0.04] rounded-lg transition-colors cursor-pointer">
          <button
            type="button"
            onClick={() => toggleDropdown('type')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0 text-[#be9870]">
                <Home className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9.5px] uppercase tracking-wider text-stone-400 font-semibold leading-tight">
                  Property Type
                </span>
                <span className="block text-[12.5px] font-medium text-white truncate leading-snug">
                  {filters.propertyType || 'Any type'}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-400 ml-1.5 shrink-0 transition-transform ${
                openDropdown === 'type' ? 'rotate-180 text-white' : ''
              }`}
            />
          </button>

          {/* Type Dropdown */}
          {openDropdown === 'type' && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#161b24] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              {typeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect('propertyType', opt)}
                  className="w-full text-left px-3 py-1.5 text-xs text-stone-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                >
                  <span>{opt}</span>
                  {filters.propertyType === opt && (
                    <Check className="w-3.5 h-3.5 text-[#be9870]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="relative px-2.5 sm:px-3 py-1.5 hover:bg-white/[0.04] rounded-lg transition-colors cursor-pointer">
          <button
            type="button"
            onClick={() => toggleDropdown('price')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0 text-[#be9870]">
                <div className="w-3.5 h-3.5 rounded-full border border-[#be9870] flex items-center justify-center text-[9px] font-bold">
                  $
                </div>
              </div>
              <div className="min-w-0">
                <span className="block text-[9.5px] uppercase tracking-wider text-stone-400 font-semibold leading-tight">
                  Price Range
                </span>
                <span className="block text-[12.5px] font-medium text-white truncate leading-snug">
                  {filters.priceRange || 'Any price'}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-400 ml-1.5 shrink-0 transition-transform ${
                openDropdown === 'price' ? 'rotate-180 text-white' : ''
              }`}
            />
          </button>

          {/* Price Dropdown */}
          {openDropdown === 'price' && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-[#161b24] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              {priceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect('priceRange', opt)}
                  className="w-full text-left px-3 py-1.5 text-xs text-stone-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                >
                  <span>{opt}</span>
                  {filters.priceRange === opt && (
                    <Check className="w-3.5 h-3.5 text-[#be9870]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bedrooms Filter */}
        <div className="relative px-2.5 sm:px-3 py-1.5 hover:bg-white/[0.04] rounded-lg transition-colors cursor-pointer">
          <button
            type="button"
            onClick={() => toggleDropdown('bedrooms')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center shrink-0 text-[#be9870]">
                <Bed className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9.5px] uppercase tracking-wider text-stone-400 font-semibold leading-tight">
                  Bedrooms
                </span>
                <span className="block text-[12.5px] font-medium text-white truncate leading-snug">
                  {filters.bedrooms || 'Any'}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-400 ml-1.5 shrink-0 transition-transform ${
                openDropdown === 'bedrooms' ? 'rotate-180 text-white' : ''
              }`}
            />
          </button>

          {/* Bedrooms Dropdown */}
          {openDropdown === 'bedrooms' && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#161b24] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              {bedroomOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect('bedrooms', opt)}
                  className="w-full text-left px-3 py-1.5 text-xs text-stone-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                >
                  <span>{opt}</span>
                  {filters.bedrooms === opt && (
                    <Check className="w-3.5 h-3.5 text-[#be9870]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search CTA Button */}
        <div className="px-1.5 py-1 flex items-center justify-center">
          <button
            type="button"
            onClick={onSearch}
            className="w-full bg-[#be9870] hover:bg-[#ad845b] text-[#1c1917] font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center space-x-1.5 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
