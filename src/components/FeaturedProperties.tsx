import React from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  onViewAll: () => void;
  isFiltered?: boolean;
  onResetFilter?: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onViewAll,
  isFiltered = false,
  onResetFilter,
}) => {
  return (
    <section id="properties" className="bg-[#fcfbf9] pt-12 sm:pt-16 pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.22em] text-stone-400 uppercase block mb-2">
              FEATURED PROPERTIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 leading-tight">
              Discover Your Dream Home
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {isFiltered && onResetFilter && (
              <button
                onClick={onResetFilter}
                className="inline-flex items-center space-x-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}

            <button
              onClick={onViewAll}
              className="group inline-flex items-center space-x-1.5 text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        {/* 4 Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={favorites.includes(prop.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/60 p-8">
            <h3 className="font-serif text-xl text-stone-800">
              No matching properties found
            </h3>
            <p className="text-sm text-stone-500 mt-2">
              Try adjusting your search criteria or resetting filters to see all featured estates.
            </p>
            {onResetFilter && (
              <button
                onClick={onResetFilter}
                className="mt-5 inline-flex items-center space-x-2 bg-[#be9870] text-stone-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#ad845b] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Show All Properties</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
