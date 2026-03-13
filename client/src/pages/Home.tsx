import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { LocationMap } from "@/components/LocationMap";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

/**
 * Cabin Ponderosa Website
 * 
 * Design Philosophy: Minimalist Artistic
 * - Large, full-width photography as primary storytelling element
 * - Generous whitespace and breathing room
 * - Simple, elegant typography (Playfair Display + Lato)
 * - Lowercase, refined navigation
 * - Image-first layout inspired by hinter.com
 * - Focus on the cabin's natural beauty and serene atmosphere
 */

export default function Home() {
  const images = {
    hero: "https://uc.orez.io/i/1a7fc56adbcd4ad8bf7bcd2adf35501f-LargeOriginal",
    interior: "https://uc.orez.io/i/25ca93160c0240318390a373564e55f6-LargeOriginal",
    deck: "https://uc.orez.io/i/fe79496aa1604ee9a3ea9707b9df29e5-LargeOriginal",
    outdoor: "https://uc.orez.io/i/f8ad910f956843229412b39bb44633bc-LargeOriginal",
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <h1 className="text-2xl font-light tracking-wide">cabin ponderosa</h1>
          <div className="flex items-center gap-8">
            <a href="#about" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">about</a>
            <a href="#testimonials" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">reviews</a>
            <a href="#location" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">location</a>
            <Link href="/booking" className="text-sm font-light hover:text-muted-foreground transition-colors">book</Link>
            <Link href="/contact" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Width Image */}
      <section className="pt-20 md:pt-24 pb-0">
        <div className="w-full h-screen md:h-screen relative overflow-hidden">
          <img
            src={images.hero}
            alt="Cabin Ponderosa exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white text-center max-w-4xl mb-4 md:mb-8">
              forest view
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 text-center max-w-2xl font-light">
              a modern retreat nestled in ponderosa pines
            </p>
          </div>
          <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
            about the cabin
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Nestled among towering ponderosa pines in the Sierra Nevada foothills, Cabin Ponderosa is a modern A-frame retreat designed for those seeking peace and natural beauty. The cabin features expansive floor-to-ceiling windows that frame stunning forest views and mountain vistas.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Built with thoughtful attention to comfort and sustainability, the cabin combines rustic charm with modern amenities. Whether you're seeking a romantic getaway, family adventure, or solo retreat, Cabin Ponderosa offers the perfect escape from the everyday.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="py-0">
        <img
          src={images.interior}
          alt="Cabin interior with forest views"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-screen object-cover"
        />
      </section>

      {/* Amenities Section */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            what's included
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-medium mb-6">comfort & convenience</h4>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li>• Fully equipped kitchen with modern appliances</li>
                <li>• Comfortable bedrooms with premium linens</li>
                <li>• Hot tub for stargazing and relaxation</li>
                <li>• Wood-burning fireplace</li>
                <li>• High-speed WiFi and smart TV</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-6">outdoor & nature</h4>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li>• Large deck with forest views</li>
                <li>• Fire pit for evening gatherings</li>
                <li>• Direct access to hiking trails</li>
                <li>• Ample parking</li>
                <li>• Peaceful, secluded setting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="py-0">
        <img
          src={images.deck}
          alt="Cabin deck with forest view"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-screen object-cover"
        />
      </section>

      {/* Pricing & CTA Section */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-16">
            <h3 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              ready to escape?
            </h3>
            <p className="text-lg text-muted-foreground font-light max-w-2xl">
              Check availability, view pricing, and secure your mountain retreat. Our booking system is powered by OwnerRez for a seamless experience.
            </p>
          </div>

          {/* Pricing Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="border-t border-border pt-6">
              <p className="text-4xl font-light mb-2">$152–600</p>
              <p className="text-sm text-muted-foreground font-light">per night</p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-2xl font-light mb-2">4–8 guests</p>
              <p className="text-sm text-muted-foreground font-light">sleeps comfortably</p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-2xl font-light mb-2">50% + 50%</p>
              <p className="text-sm text-muted-foreground font-light">payment split</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <Link href="/booking" className="flex-1">
              <Button className="w-full py-3 bg-foreground text-background hover:bg-foreground/90">
                view availability
              </Button>
            </Link>
            <Link href="/contact" className="flex-1">
              <Button variant="outline" className="w-full py-3">
                ask a question
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-16 leading-tight text-center">
            guest experiences
          </h3>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Location & Map Section */}
      <section id="location" className="section-spacing bg-secondary/5">
        <div className="container max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            explore the area
          </h3>
          <LocationMap />
        </div>
      </section>

      {/* House Rules */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-light mb-12 leading-tight">
            important details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-medium mb-4">winter access</h4>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                During snow season, 4WD/AWD vehicles and snow chains are recommended. We provide plow service for snowfall of 4+ inches. Shovels and de-icing salt available on-site.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">house policy</h4>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                No pets due to allergies. Only confirmed guests allowed on property. 24/7 exterior security cameras for safety. Cleaning fee covers standard turnover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">contact</h4>
              <a href="mailto:info@cabinponderosa.com" className="text-muted-foreground font-light hover:text-foreground transition-colors">
                info@cabinponderosa.com
              </a>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">location</h4>
              <p className="text-muted-foreground font-light">
                Arnold, CA<br />
                Sierra Nevada
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">follow</h4>
              <a href="https://instagram.com" className="text-muted-foreground font-light hover:text-foreground transition-colors">
                Instagram
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground font-light">
            <p>© 2026 Cabin Ponderosa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
