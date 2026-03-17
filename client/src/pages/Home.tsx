import { FAQAccordion } from "@/components/FAQAccordion";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { BookingWidget } from "@/components/BookingWidget";
import { Button } from "@/components/ui/button";
import { ChevronDown, Send, Calendar, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

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
    bedroom: "https://uc.orez.io/i/b7c26eb7c27848bdbfbb47010b88083d-LargeOriginal",
    kitchen: "https://uc.orez.io/f/9382362e1e3142bbb0d44bf1d2b9d676",
    bathroom: "https://uc.orez.io/f/f7fbe5045b9d430b8341fbf149b21515",
    living: "https://uc.orez.io/i/9bed0a33d3f646d8bee2e6fea3e0a7a7-LargeOriginal",
    // Additional photos from cabinponderosa.com/photos
    snowy: "https://uc.orez.io/i/baa826b1b8d8409195f46e2b98f9c5aa-LargeOriginal",
    woodstove: "https://uc.orez.io/i/be7f4f43c55445e186bed3a04b9e8fd2-LargeOriginal",
    bbq: "https://uc.orez.io/i/a126bbc59c8f4fd7b22be722d7a335d1-LargeOriginal",
    tv: "https://uc.orez.io/i/6380a3fe1ce648cda0e7e17527296337-LargeOriginal",
    furnishings: "https://uc.orez.io/i/6f91f77d27b340289f328e06cb2b703b-LargeOriginal",
    kingbed: "https://uc.orez.io/i/36652825facf45cc8b6fcce45ae39c25-LargeOriginal",
    nightstand: "https://uc.orez.io/i/6ed9d9fc70d4487d8e154f5b0394e8de-LargeOriginal",
    stove: "https://uc.orez.io/i/4cd8552c938b4bad9827d7f30c921c63-LargeOriginal",
    dishes: "https://uc.orez.io/i/4b85d04403324cb1accf49aa56edf021-LargeOriginal",
    cooking: "https://uc.orez.io/i/f61210846c0241abb88914d6671f5fa9-LargeOriginal",
    loft: "https://uc.orez.io/i/297de73a22b14c80a39eec1b89a1d2b7-LargeOriginal",
    blanket: "https://uc.orez.io/i/b48e74ee719044b8844b544856032df6-LargeOriginal",
    workstation: "https://uc.orez.io/i/9c2b6e83ae7d4ece94d0714418aa0e7f-LargeOriginal",
    bathtub: "https://uc.orez.io/i/f84a92d9fd5542a589dbc177fedb773c-LargeOriginal",
    shower: "https://uc.orez.io/i/ca6fb46aa3e34389942c096d40041a7e-LargeOriginal",
    diningtable: "https://uc.orez.io/i/81bfc82d4028423f80188c10176e1f64-LargeOriginal",
    comfortable: "https://uc.orez.io/i/7759fb6823104089877d1ef0aa7243ab-LargeOriginal",
    woodstove2: "https://uc.orez.io/i/6f4b1e934c3e49378425782c22575085-LargeOriginal",
    spaciousdeck: "https://uc.orez.io/i/300ba336a38640faa8e1bb3c05ff48ce-LargeOriginal",
    mealsurrounded: "https://uc.orez.io/i/733c18d11c384285bfffdb4a044d6b58-LargeOriginal",
    loungesofa: "https://uc.orez.io/i/97f95bdc1d4644aaa20db1a55977358f-LargeOriginal",
    snow: "https://uc.orez.io/i/1cd401b087674f10ae67bd9d2fc7198a-LargeOriginal",
    outdoorchairs: "https://uc.orez.io/i/a26a33bc71744e0a9ab73fd4adea5736-LargeOriginal",
    neighborhood: "https://uc.orez.io/i/2980cc05a86f4acb9fe78b0e047edff3-LargeOriginal",
    fireplace: "https://uc.orez.io/i/1bc42df403f24f9cad304fffcad00f57-LargeOriginal",
    woods: "https://uc.orez.io/i/8a26550123b149388023fd70e6d28f5c-LargeOriginal",
    evcharger: "https://uc.orez.io/i/e51e2fad04b0475c948cc02fa16b8c71-LargeOriginal",
    bluelake: "https://uc.orez.io/i/5a869d72814c47f3b96ff02550d75a12-LargeOriginal",
    bluelake2: "https://uc.orez.io/i/8d09be83313c4cf696ebe8c0acd6735a-LargeOriginal",
    bluelake3: "https://uc.orez.io/i/65b6010d88994477ac14f4234a9d95df-LargeOriginal",
    centrally: "https://uc.orez.io/i/a9ec05ff44fe4dc7ac2f0dcb2fa22d24-LargeOriginal",
    bigtrees: "https://uc.orez.io/i/7b452d09ca514bb785fe00d5b4df858f-LargeOriginal",
  };

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submitInquiry = trpc.contact.submitInquiry.useMutation({
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you soon.");
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitInquiry.mutateAsync(contactForm);
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
            <a href="#booking" className="text-sm font-light hover:text-muted-foreground transition-colors">book</a>
            <Link href="#contact" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">contact</Link>
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
          <div>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Surrounded by Ponderosa pine trees of the Sierras, Cabin Ponderosa is a modern A-frame retreat designed for those seeking peace and comfort.
            </p>
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
                <li>• High-speed WiFi and smart TV</li>
                <li>• Fully equipped kitchen</li>
                <li>• Washer & dryer</li>
                <li>• Air conditioning & Central Heating</li>
                <li>• Wood-burning stove</li>
                <li>• EV charger</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-6">outdoor & nature</h4>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li>• Private forest-view deck</li>
                <li>• Outdoor fire pit</li>
                <li>• BBQ grill</li>
                <li>• Outdoor dining area with lounge seating</li>
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

      {/* Photo Gallery Carousel */}
      <section className="section-spacing bg-secondary/5">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            explore the cabin
          </h3>
          <PhotoCarousel
            photos={[
              { url: images.snowy, alt: "Snowy day at the cabin" },
              { url: images.woodstove, alt: "Cozy wood stove" },
              { url: images.bbq, alt: "BBQ grill and dining table" },
              { url: images.tv, alt: "Living room with TV" },
              { url: images.furnishings, alt: "Stylish furnishings" },
              { url: images.kingbed, alt: "King memory mattress bedroom" },
              { url: images.nightstand, alt: "Cute nightstand" },
              { url: images.stove, alt: "Stainless steel stove" },
              { url: images.dishes, alt: "Kitchen dishes and cookware" },
              { url: images.cooking, alt: "Equipped kitchen" },
              { url: images.loft, alt: "Spacious loft area" },
              { url: images.blanket, alt: "Cozy blanket" },
              { url: images.workstation, alt: "Work station with monitor" },
              { url: images.bathtub, alt: "Clean bathroom with tub" },
              { url: images.shower, alt: "Upstairs bathroom with shower" },
              { url: images.diningtable, alt: "Acacia dining table" },
              { url: images.comfortable, alt: "Comfortable seating" },
              { url: images.woodstove2, alt: "Wood stove for cozy nights" },
              { url: images.spaciousdeck, alt: "Spacious deck to lounge" },
              { url: images.mealsurrounded, alt: "Meal surrounded by trees" },
              { url: images.loungesofa, alt: "Lounge sofa and fireplace on deck" },
              { url: images.snow, alt: "Fresh snow in the mountain" },
              { url: images.outdoorchairs, alt: "Outdoor chairs" },
              { url: images.neighborhood, alt: "Serene neighborhood" },
              { url: images.fireplace, alt: "Fireplace with sunset view" },
              { url: images.woods, alt: "Nestled in the woods" },
              { url: images.evcharger, alt: "EV charger" },
              { url: images.bluelake, alt: "Blue Lake Springs recreation center" },
              { url: images.bluelake2, alt: "Blue Lake Springs with pool" },
              { url: images.bluelake3, alt: "Blue Lake Springs recreation" },
              { url: images.centrally, alt: "Centrally located" },
              { url: images.bigtrees, alt: "Big Trees State Park nearby" },
            ]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-secondary/5">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight text-center">
            frequently asked
          </h3>
          <FAQAccordion />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-16 leading-tight text-center">
            guest experiences
          </h3>
          {/* Testimonials placeholder - to be implemented */}
          <div className="text-center text-muted-foreground">
            Guest testimonials coming soon
          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section id="location" className="section-spacing bg-secondary/5">
        <div className="container max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            explore the area
          </h3>
          {/* Map placeholder - to be implemented */}
          <div className="text-center text-muted-foreground">
            Interactive map coming soon
          </div>
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

      {/* Booking Widget Section */}
      <section id="booking" className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            book your stay
          </h3>
          <BookingWidget />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing bg-secondary/5">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            get in touch
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-white text-foreground placeholder-muted-foreground"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-white text-foreground placeholder-muted-foreground"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Phone"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-white text-foreground placeholder-muted-foreground"
              />
              <input
                type="text"
                placeholder="Subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-white text-foreground placeholder-muted-foreground"
                required
              />
            </div>
            <textarea
              placeholder="Message"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-white text-foreground placeholder-muted-foreground resize-none"
              required
            />
            <Button
              type="submit"
              disabled={submitInquiry.isPending}
              className="w-full py-3 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitInquiry.isPending ? "Sending..." : "send message"}</span>
            </Button>
          </form>
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
