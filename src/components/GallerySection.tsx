import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  onOpenLightbox: (initialIndex?: number) => void;
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onOpenLightbox,
  galleryItems,
}) => {
  return (
    <section id="gallery" className="bg-[#fcfbf9] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Copy & Action (cols 1-4) */}
          <div className="lg:col-span-4">
            <span className="text-[11px] font-semibold tracking-[0.22em] text-stone-400 uppercase block mb-2">
              EXPLORE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 leading-tight mb-4">
              Our Gallery
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-7 max-w-sm">
              A glimpse into the extraordinary. Explore our curated collection of luxury properties.
            </p>
            <button
              onClick={() => onOpenLightbox(0)}
              className="inline-flex items-center space-x-2 border border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Right Column: Mosaic Photo Grid (cols 5-12) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
              {/* Large Pool Feature Image (cols 1-6) */}
              <div
                onClick={() => onOpenLightbox(0)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onOpenLightbox(0);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Open sunset infinity pool photo"
                className="sm:col-span-6 relative rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md aspect-[4/3] sm:aspect-auto sm:h-full min-h-[220px]"
              >
                <img
                  src="/frames/frame_0078.webp"
                  alt="Sunset Infinity Pool"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* 2x2 Subgrid (cols 7-12) */}
              <div className="sm:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
                {/* Top Left: Living Room */}
                <div
                  onClick={() => onOpenLightbox(1)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenLightbox(1);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Open living room lounge photo"
                  className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md aspect-[4/3]"
                >
                  <img
                    src="/frames/frame_0128.webp"
                    alt="Living Room Lounge"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Top Right: Bedroom */}
                <div
                  onClick={() => onOpenLightbox(2)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenLightbox(2);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Open master bedroom suite photo"
                  className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md aspect-[4/3]"
                >
                  <img
                    src="/frames/frame_0144.webp"
                    alt="Master Bedroom Suite"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Bottom Left: Coastline */}
                <div
                  onClick={() => onOpenLightbox(3)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenLightbox(3);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Open coastline aerial vista photo"
                  className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md aspect-[4/3]"
                >
                  <img
                    src="/frames/frame_0003.webp"
                    alt="Coastline Aerial Vista"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Bottom Right: +12 More Photos Card */}
                <div
                  onClick={() => onOpenLightbox(4)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenLightbox(4);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Open more gallery photos"
                  className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md aspect-[4/3] bg-stone-900"
                >
                  <img
                    src="/frames/frame_0090.webp"
                    alt="More Photos"
                    className="w-full h-full object-cover opacity-35 group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-950/70 group-hover:bg-stone-950/60 transition-colors flex flex-col items-center justify-center text-center p-2">
                    <span className="font-sans text-xl sm:text-2xl font-bold text-white tracking-wide">
                      +{Math.max(12, galleryItems.length - 4)}
                    </span>
                    <span className="text-[11px] sm:text-xs text-stone-300 font-medium mt-0.5 tracking-wider">
                      More Photos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
