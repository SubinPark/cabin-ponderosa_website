import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface Photo {
  url: string;
  alt: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
}

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      // Calculate the width of one photo item (including gap)
      const firstChild = container.firstElementChild as HTMLElement;
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 16; // 16px is the gap
        container.scrollBy({
          left: direction === "left" ? -itemWidth : itemWidth,
          behavior: "smooth",
        });
        setTimeout(checkScroll, 300);
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-4 md:px-0"
        style={{ scrollBehavior: "smooth" }}
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-80 md:h-96 rounded-lg overflow-hidden bg-secondary/10 flex items-center justify-center"
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      )}
    </div>
  );
}
