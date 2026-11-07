import React from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Properties', id: 'properties' },
    { label: 'About', id: 'experience' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-[#0b0d10] text-white pt-16 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo, Nav, Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12">
          {/* Logo */}
          <div>
            <Logo light={true} />
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-7 sm:gap-9">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-xs sm:text-[13px] text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#be9870] hover:bg-white/5 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#be9870] hover:bg-white/5 transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#be9870] hover:bg-white/5 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#be9870] hover:bg-white/5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-light gap-4">
          <div>© 2025 Horizon Estate. All rights reserved.</div>
          <div className="tracking-wider">Luxury Homes. Timeless Value.</div>
        </div>
      </div>
    </footer>
  );
};
