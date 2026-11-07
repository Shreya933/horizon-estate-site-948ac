import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProperties } from './components/FeaturedProperties';
import { ExperienceSection } from './components/ExperienceSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { LightboxModal } from './components/LightboxModal';
import { SearchModal } from './components/SearchModal';
import { FEATURED_PROPERTIES, GALLERY_ITEMS } from './data/estateData';
import { Property, SearchFilterState } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('horizon_favorites');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [enquiryProperty, setEnquiryProperty] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search filter state
  const [filters, setFilters] = useState<SearchFilterState>({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
  });
  const [appliedFilters, setAppliedFilters] = useState<SearchFilterState>({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'properties', 'experience', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      '#properties, #gallery, #contact',
    );
    sections.forEach((section) => section.classList.add('scroll-reveal'));

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('horizon_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      showToast(exists ? 'Removed from saved properties' : 'Added to saved properties');
      return updated;
    });
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleOpenEnquire = () => {
    handleNavigate('contact');
    const input = document.getElementById('fullName');
    if (input) input.focus();
  };

  const handleSearchSubmit = () => {
    setAppliedFilters({ ...filters });
    handleNavigate('properties');
    showToast('Applied search filters');
  };

  const handleResetFilters = () => {
    const emptyFilters = {
      location: '',
      propertyType: '',
      priceRange: '',
      bedrooms: '',
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    showToast('Filters cleared');
  };

  // Filter properties according to applied filters
  const filteredProperties = useMemo(() => {
    return FEATURED_PROPERTIES.filter((prop) => {
      // Location
      if (appliedFilters.location && appliedFilters.location !== 'Any location') {
        const locClean = appliedFilters.location.toLowerCase();
        if (
          !prop.location.toLowerCase().includes(locClean) &&
          !prop.city.toLowerCase().includes(locClean)
        ) {
          return false;
        }
      }

      // Property Type
      if (appliedFilters.propertyType && appliedFilters.propertyType !== 'Any type') {
        if (prop.tag.toLowerCase() !== appliedFilters.propertyType.toLowerCase()) {
          return false;
        }
      }

      // Bedrooms
      if (appliedFilters.bedrooms && appliedFilters.bedrooms !== 'Any') {
        const bedNum = parseInt(appliedFilters.bedrooms, 10);
        if (!isNaN(bedNum) && prop.beds < bedNum) {
          return false;
        }
      }

      // Price Range
      if (appliedFilters.priceRange && appliedFilters.priceRange !== 'Any price') {
        if (appliedFilters.priceRange.includes('Under $3,000,000')) {
          if (prop.numericPrice >= 3000000) return false;
        } else if (appliedFilters.priceRange.includes('$3,000,000 - $5,000,000')) {
          if (prop.numericPrice < 3000000 || prop.numericPrice > 5000000) return false;
        } else if (appliedFilters.priceRange.includes('$5,000,000 - $10,000,000')) {
          if (prop.numericPrice < 5000000) return false;
        }
      }

      return true;
    });
  }, [appliedFilters]);

  const isFiltered = Boolean(
    (appliedFilters.location && appliedFilters.location !== 'Any location') ||
    (appliedFilters.propertyType && appliedFilters.propertyType !== 'Any type') ||
    (appliedFilters.priceRange && appliedFilters.priceRange !== 'Any price') ||
    (appliedFilters.bedrooms && appliedFilters.bedrooms !== 'Any')
  );

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 flex flex-col font-sans selection:bg-[#be9870] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#12161f] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-2xl border border-white/10 flex items-center space-x-2 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-[#be9870]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenEnquire={handleOpenEnquire}
      />

      {/* Hero Section with Overlapping Search Bar */}
      <Hero
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearchSubmit}
      />

      {/* Featured Properties Section */}
      <FeaturedProperties
        properties={filteredProperties}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onViewAll={() => {
          handleResetFilters();
          handleNavigate('properties');
        }}
        isFiltered={isFiltered}
        onResetFilter={handleResetFilters}
      />

      {/* The Horizon Experience Section */}
      <ExperienceSection
        onExploreProperties={() => handleNavigate('properties')}
      />

      {/* Explore Our Gallery Section */}
      <GallerySection
        onOpenLightbox={(idx = 0) => {
          setLightboxIndex(idx);
          setIsLightboxOpen(true);
        }}
        galleryItems={GALLERY_ITEMS}
      />

      {/* Get In Touch Contact Section */}
      <ContactSection defaultPropertyInterest={enquiryProperty} />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onScheduleViewing={(propTitle) => {
          setEnquiryProperty(propTitle);
          handleNavigate('contact');
          const msgEl = document.getElementById('message');
          if (msgEl) msgEl.focus();
        }}
      />

      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        items={GALLERY_ITEMS}
        initialIndex={lightboxIndex}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        properties={FEATURED_PROPERTIES}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />
    </div>
  );
}
