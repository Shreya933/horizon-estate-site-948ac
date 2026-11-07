import React from 'react';
import { SearchBar } from './SearchBar';
import { HeroBackgroundVideo } from './HeroBackgroundVideo';
import { SearchFilterState } from '../types';

interface HeroProps {
  filters: SearchFilterState;
  onFilterChange: (filters: SearchFilterState) => void;
  onSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onSearch,
}) => {
  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[590px] flex-col justify-center overflow-hidden pt-28 pb-16 text-white sm:min-h-[650px] sm:pt-32 lg:min-h-[700px]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <HeroBackgroundVideo />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f]/85 via-black/35 to-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fcfbf9]/15 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="mb-4 inline-flex items-center space-x-2">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#d6b492] uppercase sm:text-xs">
                LUXURY REAL ESTATE
              </span>
            </div>
            <h1 className="font-serif text-4xl font-normal leading-[1.12] tracking-normal text-white sm:text-5xl lg:text-[58px]">
              Extraordinary Homes for a Better Tomorrow
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed font-light text-stone-200/90 sm:text-base">
              Discover exclusive properties in the world&apos;s most sought-after locations. Luxury, comfort and timeless design — all in one place.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-0 bg-[#fcfbf9] px-4 pt-7 pb-1 sm:px-6 sm:pt-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl justify-center">
          <SearchBar filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
        </div>
      </div>
    </>
  );
};
