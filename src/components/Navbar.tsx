import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenEnquire: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenEnquire,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Properties', id: 'properties' },
    { label: 'About', id: 'experience' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f1217]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg'
          : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo light={true} />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative text-[13.5px] tracking-wide font-normal transition-colors py-1 cursor-pointer ${
                    isActive ? 'text-white' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#be9870] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              onClick={onOpenSearch}
              aria-label="Search properties"
              className="p-2 text-white hover:text-[#be9870] transition-colors rounded-full hover:bg-white/5 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              onClick={onOpenEnquire}
              className="bg-[#be9870] hover:bg-[#ad845b] text-[#1c1917] text-[13px] font-medium px-5 py-2 rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={onOpenSearch}
              aria-label="Search properties"
              className="p-1.5 text-white hover:text-[#be9870]"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-stone-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f1217]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-sm font-medium py-2 transition-colors ${
                  activeSection === link.id
                    ? 'text-[#be9870] font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquire();
              }}
              className="w-full bg-[#be9870] text-[#1c1917] font-medium py-2.5 rounded-lg text-sm text-center"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
