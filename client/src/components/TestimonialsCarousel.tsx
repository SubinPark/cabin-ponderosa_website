import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Testimonial {
  id: number;
  guestName: string;
  rating: number;
  review: string;
  createdAt?: Date;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    guestName: "Sandy",
    rating: 5,
    review: "My family and I had the most incredible time at Susan’s Airbnb and highly recommend it to anyone considering a stay! The house was spotless and perfectly located — surrounded by beautiful trees, near big tree park, and just minutes from downtown Arnold. The indoor and outdoor fireplaces were such a cozy touch, and the kids loved making s’mores. Having an EV charger was a huge plus for us, and the peaceful, quiet setting made it the perfect getaway. The hosts were wonderful — very communicative and checked in to ensure we had everything we needed throughout our stay. I’m so appreciative and can’t wait to return. Thank you so much for hosting us!"
  },
  {
    id: 2,
    guestName: "Elena",
    rating: 5,
    review: "The location was perfect, the home was cozy and clean. Susan is communicative, kind and thoughtful. We recommend this listing to anyone visiting and would like to come back."
  },
  {
    id: 3,
    guestName: "Esra",
    rating: 5,
    review: "Lovely home, lovely location. Susan and her husband were super helpful and communicative. We really enjoyed our stay. It is perfect if you’re looking for a peaceful place🤗"
  },
  {
    id: 4,
    guestName: "Shelby",
    rating: 5,
    review: "We absolutely loved our stay at Cabin Ponderosa! Susan was incredibly responsive and helpful from the start. The house was exactly as described and just so cozy! We loved having our morning coffee on the deck amongst the trees. The outdoor fire pit was such a treat! Susan had everything labeled with instructions throughout the home, which we thought was so incredibly helpful. The location was prime, only a short drive to downtown Arnold. We will certainly be back again. Thanks Susan, we loved our stay!"
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Fetch testimonials from database
  const { data: dbTestimonials = [] } = trpc.testimonials.list.useQuery();

  // Use database testimonials if available, otherwise use defaults
  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;

  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

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

  if (testimonials.length === 0) {
    return <div className="text-center text-muted-foreground">Loading testimonials...</div>;
  }

  const currentTestimonial = testimonials[current];

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
                    <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto text-foreground">
                  "{testimonial.review}"
                </p>
                <p className="font-medium text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{testimonial.guestName}</p>
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
