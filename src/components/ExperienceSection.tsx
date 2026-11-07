import React from 'react';
import { ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { ScrollVideoPlayer } from './ScrollVideoPlayer';

interface ExperienceSectionProps {
  onExploreProperties: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onExploreProperties,
}) => {
  return (
    <section
      id="experience"
      className="experience-scroll-section border-y border-white/5 bg-[#10141a] text-white"
    >
      <div className="experience-sticky-shell flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-5 sm:gap-7 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <ScrollVideoPlayer />
            </div>

            <div className="lg:col-span-4 lg:pl-2">
              <span className="mb-2 block text-[10px] font-semibold tracking-[0.22em] text-[#be9870] uppercase sm:mb-3 sm:text-[11px]">
                The Horizon Experience
              </span>
              <h2 className="mb-2 font-serif text-2xl font-normal leading-[1.15] text-white sm:mb-4 sm:text-4xl">
                More Than a Home, It&apos;s a Lifestyle
              </h2>
              <p className="mb-3 max-w-xl text-xs leading-relaxed font-light text-stone-300 sm:mb-6 sm:text-sm">
                At Horizon Estate, we curate extraordinary properties that inspire. From oceanfront villas to urban penthouses, each residence is a masterpiece of design, location and luxury.
              </p>
              <button
                onClick={onExploreProperties}
                className="inline-flex cursor-pointer items-center space-x-2 rounded-lg bg-[#be9870] px-5 py-2.5 text-xs font-medium text-[#1c1917] shadow-md transition-all hover:bg-[#ad845b] hover:shadow-lg active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
              >
                <span>Explore Our Properties</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-2 lg:col-span-3 lg:grid-cols-1 lg:gap-5 lg:pl-4">
              <div className="group flex items-start space-x-2.5 lg:space-x-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#be9870]/40 text-[#be9870] transition-colors group-hover:border-[#be9870] group-hover:bg-[#be9870]/10 sm:h-10 sm:w-10">
                  <svg className="h-4 w-4 fill-none stroke-current sm:h-5 sm:w-5" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path d="M12 2L19 9C20.5 10.5 21 12.5 20 14.5C18.5 17.5 12 22 12 22C12 22 5.5 17.5 4 14.5C3 12.5 3.5 10.5 5 9L12 2Z" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-wide text-white sm:text-sm">Prime Locations</h4>
                  <p className="mt-0.5 text-[9px] text-stone-400 sm:text-xs">World&apos;s most desirable destinations</p>
                </div>
              </div>

              <div className="group flex items-start space-x-2.5 lg:space-x-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#be9870]/40 text-[#be9870] transition-colors group-hover:border-[#be9870] group-hover:bg-[#be9870]/10 sm:h-10 sm:w-10">
                  <svg className="h-4 w-4 fill-none stroke-current sm:h-5 sm:w-5" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path d="M3 10L12 3L21 10V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V10Z" />
                    <path d="M9 21V12H15V21" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-wide text-white sm:text-sm">Luxury Design</h4>
                  <p className="mt-0.5 text-[9px] text-stone-400 sm:text-xs">Timeless architecture &amp; interiors</p>
                </div>
              </div>

              <div className="group flex items-start space-x-2.5 lg:space-x-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#be9870]/40 text-[#be9870] transition-colors group-hover:border-[#be9870] group-hover:bg-[#be9870]/10 sm:h-10 sm:w-10">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-wide text-white sm:text-sm">Trusted Expertise</h4>
                  <p className="mt-0.5 text-[9px] text-stone-400 sm:text-xs">Years of real estate excellence</p>
                </div>
              </div>

              <div className="group flex items-start space-x-2.5 lg:space-x-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#be9870]/40 text-[#be9870] transition-colors group-hover:border-[#be9870] group-hover:bg-[#be9870]/10 sm:h-10 sm:w-10">
                  <UserCheck className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-[11px] font-medium tracking-wide text-white sm:text-sm">Personalized Service</h4>
                  <p className="mt-0.5 text-[9px] text-stone-400 sm:text-xs">Your vision, our priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
