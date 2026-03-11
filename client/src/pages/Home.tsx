import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wifi, Flame, Mountain, Users, Bed, Bath, DollarSign, ChevronRight, Star } from "lucide-react";
import { BookingWidget } from "@/components/BookingWidget";

/**
 * Modern Alpine Minimalism Design
 * - Warm neutrals with forest green and burnt orange accents
 * - Generous whitespace and clean typography
 * - Large photography showcasing the cabin's natural beauty
 * - Smooth scroll reveals and minimal interactions
 */

export default function Home() {
  const heroImages = [
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663427336707/TnMwebaxrq4DyNoB3xu9hC/cabin-hero-main-agzL7hQtWws5EXcm3j54Vx.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663427336707/TnMwebaxrq4DyNoB3xu9hC/cabin-interior-hero-8cZhQFoNA285mMJqeW8FDg.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663427336707/TnMwebaxrq4DyNoB3xu9hC/cabin-outdoor-deck-i52JSzfsnyDj7qUXx6v5g8.webp",
  ];

  const amenities = [
    { icon: Wifi, label: "High-Speed Internet", category: "General" },
    { icon: Flame, label: "Wood Stove & Fireplace", category: "General" },
    { icon: Mountain, label: "Lake Access", category: "Setting & View" },
    { icon: Users, label: "Sleeps 4-8 Guests", category: "Sleeping" },
    { icon: Bed, label: "3 Bedrooms", category: "Sleeping" },
    { icon: Bath, label: "2 Full Bathrooms", category: "Bathrooms" },
  ];

  const nearbyAttractions = [
    { name: "Blue Lake Springs Amenities", distance: "4 mins", description: "Pool, private lakes, restaurant, playground" },
    { name: "Calaveras Big Trees State Park", distance: "8 mins", description: "Ancient sequoia groves and hiking trails" },
    { name: "Lake Alpine", distance: "35 mins", description: "Mountain lake with water activities" },
    { name: "Bear Valley Ski Resort", distance: "40 mins", description: "Winter skiing and summer activities" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-foreground">
            Cabin Ponderosa
          </div>
          <div className="flex items-center gap-8">
            <a href="#amenities" className="text-foreground hover:text-accent transition-colors">Amenities</a>
            <a href="#location" className="text-foreground hover:text-accent transition-colors">Location</a>
            <a href="#booking" className="text-foreground hover:text-accent transition-colors">Book Now</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-end overflow-hidden">
        <img
          src={heroImages[0]}
          alt="Cabin Ponderosa exterior at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="relative z-10 container pb-16 md:pb-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Forest View A-Frame
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Modern retreat nestled in Ponderosa pines with stunning Sierra Nevada views
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex items-center gap-2 text-white">
                <DollarSign className="w-5 h-5" />
                <span className="text-lg">$152–600/night</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                <span className="text-lg">Sleeps 4–8 guests</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Your Mountain Sanctuary</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Recently updated and thoughtfully designed, Cabin Ponderosa offers the perfect escape into nature. With high peaked ceilings, expansive glass windows, and a modern aesthetic, you'll experience the serenity of the Sierra Nevada from every corner of this A-frame retreat.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The entire cabin is yours to enjoy—three sleeping areas, two full bathrooms, a fully equipped kitchen, and spacious outdoor decks with a gas fire pit. Whether you're seeking a peaceful retreat or an adventure base, Cabin Ponderosa delivers.
              </p>
              <Button className="cta-button">
                Check Availability
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <img
              src={heroImages[1]}
              alt="Cabin interior with fireplace"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16 md:py-24 bg-secondary/5 border-y border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Premium Amenities</h2>
            <p className="section-subtitle">Everything you need for a comfortable mountain retreat</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <Card key={idx} className="card-hover border-border bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{amenity.label}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{amenity.category}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Full Amenities List */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Kitchen & Dining</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Full kitchen with stove, oven, microwave
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Dishwasher & full utensils
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Coffee maker & wine glasses
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Dining table & outdoor grill
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Comfort & Entertainment</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Smart TV with streaming & games
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Washer & dryer
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Air conditioning & central heating
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Linens & towels provided
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <img
              src={heroImages[2]}
              alt="Cabin deck with mountain views"
              className="rounded-lg shadow-lg w-full h-auto order-2 md:order-1"
            />
            <div className="order-1 md:order-2">
              <h2 className="section-title">Perfectly Located</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nestled in the desirable Blue Lake Springs community, Cabin Ponderosa puts you minutes away from world-class attractions and outdoor activities. Whether you're seeking adventure or relaxation, everything is within reach.
              </p>
              
              <div className="space-y-4">
                {nearbyAttractions.map((attraction, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b border-border last:border-0">
                    <div className="flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="font-semibold text-foreground">{attraction.name}</h4>
                        <span className="text-sm text-accent font-medium">{attraction.distance}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{attraction.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 md:py-24 bg-accent/5 border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Ready to Book Your Retreat?</h2>
              <p className="section-subtitle">Check availability and secure your dates with our OwnerRez booking calendar</p>
            </div>
            
            {/* OwnerRez Booking Widget */}
            <BookingWidget showPlaceholder={true} />

            {/* House Rules */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">House Rules</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Maximum occupancy: 8 guests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Children and infants welcome</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Smoking not allowed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>No pets allowed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Minimum renter age: 25</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Winter Note</h3>
                <p className="text-muted-foreground mb-4">
                  During winter snow season, 4WD/AWD vehicles and snow chains are highly recommended for accessing our steep driveway. We provide plow service for snowfall of 4+ inches, shovels, and de-icing salt.
                </p>
                <p className="text-muted-foreground">
                  Security cameras monitor the exterior of the property 24/7 for guest and property safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Cabin Ponderosa</h3>
              <p className="text-background/80">
                A modern A-frame retreat in the Sierra Nevada mountains near Arnold, California.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-background/80 mb-2">
                <a href="mailto:info@cabinponderosa.com" className="hover:text-background transition-colors">
                  info@cabinponderosa.com
                </a>
              </p>
              <p className="text-background/80">
                <a href="tel:+1234567890" className="hover:text-background transition-colors">
                  Call for inquiries
                </a>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" className="text-background/80 hover:text-background transition-colors">
                  Facebook
                </a>
                <a href="https://instagram.com" className="text-background/80 hover:text-background transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/60">
            <p>&copy; 2026 Cabin Ponderosa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
