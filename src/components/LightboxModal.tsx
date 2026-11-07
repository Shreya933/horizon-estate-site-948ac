import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  initialIndex?: number;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const activeItem = filteredItems[currentIndex] || items[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, filteredItems.length]);

  if (!isOpen || !activeItem) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const categories = ['All', 'Villa', 'Penthouse', 'Interior', 'Aerial'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
        {/* Category Filter Pills */}
        <div className="hidden sm:flex items-center space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#be9870] text-stone-900 font-semibold'
                  : 'bg-white/5 text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-xs font-mono text-stone-400">
          <span className="text-white font-semibold">{currentIndex + 1}</span> / {filteredItems.length}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#be9870] hover:text-stone-900 transition-colors shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Image Display */}
        <div className="max-w-5xl max-h-[70vh] flex flex-col items-center justify-center">
          <img
            key={activeItem.id}
            src={activeItem.image}
            alt={activeItem.title}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
          />
          <div className="text-center mt-4">
            <h4 className="font-serif text-lg sm:text-xl text-white">
              {activeItem.title}
            </h4>
            <p className="text-xs text-stone-400 mt-1">
              {activeItem.location} • <span className="text-[#be9870]">{activeItem.category}</span>
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#be9870] hover:text-stone-900 transition-colors shadow-xl"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="px-6 py-4 border-t border-white/10 bg-black/40 overflow-x-auto">
        <div className="flex items-center justify-center space-x-2.5 min-w-max mx-auto">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? 'border-[#be9870] scale-105'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
