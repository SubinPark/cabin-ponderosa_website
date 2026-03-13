import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah & Michael",
    rating: 5,
    text: "Absolutely stunning cabin. The views are breathtaking, and everything was immaculate. We felt completely disconnected from the world in the best way possible. Can't wait to return.",
    date: "March 2026"
  },
  {
    id: 2,
    name: "Jennifer",
    rating: 5,
    text: "Perfect mountain getaway. The A-frame design with those massive windows is incredible. The fire pit was the highlight of our evenings. Highly recommend for anyone seeking peace and nature.",
    date: "February 2026"
  },
  {
    id: 3,
    name: "David & Lisa",
    rating: 5,
    text: "Exceeded all expectations. The cabin is beautifully maintained, and the location is ideal for exploring the Sierra Nevada. We appreciated the thoughtful touches and excellent communication.",
    date: "January 2026"
  },
  {
    id: 4,
    name: "Emma",
    rating: 5,
    text: "A true sanctuary in the forest. The combination of modern comfort and natural beauty is unmatched. The hot showers after hiking were pure bliss. Definitely coming back.",
    date: "December 2025"
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="w-full">
      {/* Testimonial Display */}
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out select-none"
          style={{ transform: `translateX(-${current * 100}%)` }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4 sm:px-6 md:px-0">
              <div className="text-center py-8 sm:py-12 md:py-16">
                <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-base sm:text-lg md:text-xl">★</span>
                  ))}
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto text-foreground">
                  "{testimonial.text}"
                </p>
                <p className="font-medium text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-light">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 md:mt-12">
        <button
          onClick={goToPrevious}
          className="p-1.5 sm:p-2 hover:bg-secondary rounded-full transition-colors active:bg-muted"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-1.5 sm:gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === current
                  ? 'bg-foreground w-6 h-2'
                  : 'w-2 h-2 bg-border hover:bg-muted-foreground'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-1.5 sm:p-2 hover:bg-secondary rounded-full transition-colors active:bg-muted"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4 sm:mt-6 text-xs text-muted-foreground font-light">
        {current + 1} / {testimonials.length}
      </div>
    </div>
  );
}
