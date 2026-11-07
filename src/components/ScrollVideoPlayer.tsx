import { useEffect, useRef } from 'react';

export const ScrollVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let isVisible = false;

    const stopAndReset = () => {
      video.pause();
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        video.currentTime = 0;
      }
    };

    const playFromStart = () => {
      if (motionPreference.matches) return;
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        video.currentTime = 0;
      }
      void video.play().catch(() => {
        // The poster remains visible if the browser blocks autoplay.
      });
    };

    const setVisibility = (visible: boolean) => {
      if (visible === isVisible) return;
      isVisible = visible;

      if (visible) playFromStart();
      else stopAndReset();
    };

    let observer: IntersectionObserver | undefined;
    let updateVisibility: (() => void) | undefined;

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          setVisibility(
            Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.08),
          );
        },
        { threshold: [0, 0.08] },
      );
      observer.observe(video);
    } else {
      updateVisibility = () => {
        const bounds = video.getBoundingClientRect();
        setVisibility(bounds.bottom > 0 && bounds.top < window.innerHeight);
      };
      window.addEventListener('scroll', updateVisibility, { passive: true });
      window.addEventListener('resize', updateVisibility);
      updateVisibility();
    }

    const handleMotionPreferenceChange = () => {
      if (motionPreference.matches) stopAndReset();
      else if (isVisible) playFromStart();
    };
    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      observer?.disconnect();
      if (updateVisibility) {
        window.removeEventListener('scroll', updateVisibility);
        window.removeEventListener('resize', updateVisibility);
      }
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
      stopAndReset();
    };
  }, []);

  return (
    <div
      className="experience-frame relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#171b21] shadow-2xl"
      role="img"
      aria-label="Cinematic luxury estate video"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
        poster="/experience-scroll-poster.webp"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/experience-scroll.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
