import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { BookingWidget } from "@/components/BookingWidget";
import { Button } from "@/components/ui/button";
import { ChevronDown, Send, Calendar, MessageCircle, Instagram, Facebook } from "lucide-react";
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

// "explore the cabin" carousel photos: auto-loaded from client/src/assets/gallery/.
// To change photos, just add/remove/rename files in that folder. Order follows the
// leading number in the filename (e.g. "010-deck.jpg" before "020-kitchen.jpg") —
// any number works, so leave gaps (10, 20, 30...) to make it easy to insert a photo
// later without renaming the others. The alt text is generated from the filename.
const galleryModules = import.meta.glob<{ default: string }>(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true }
);
const galleryPhotos = Object.keys(galleryModules)
  .map((path) => {
    const filename = path.split("/").pop()!.replace(/\.[^.]+$/, "");
    const match = filename.match(/^(\d+)-?/);
    const order = match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
    const alt = filename.replace(/^\d+-/, "").replace(/[-_]/g, " ");
    return { url: galleryModules[path].default, alt, order, filename };
  })
  .sort((a, b) => a.order - b.order || a.filename.localeCompare(b.filename))
  .map(({ url, alt }) => ({ url, alt }));

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
    snowy: "https://uc.orez.io/i/baa826b1b8d8409195f46e2b98f9c5aa-LargeOriginal",
    woodstove: "https://uc.orez.io/i/be7f4f43c55445e186bed3a04b9e8fd2-LargeOriginal",
    bathroom2: "https://uc.orez.io/f/f7fbe5045b9d430b8341fbf149b21515",
    living2: "https://uc.orez.io/i/9bed0a33d3f646d8bee2e6fea3e0a7a7-LargeOriginal",
    outdoor2: "https://uc.orez.io/i/f8ad910f956843229412b39bb44633bc-LargeOriginal",
    deck2: "https://uc.orez.io/i/fe79496aa1604ee9a3ea9707b9df29e5-LargeOriginal",
    woodstove3: "https://uc.orez.io/i/be7f4f43c55445e186bed3a04b9e8fd2-LargeOriginal",
    tv2: "https://uc.orez.io/f/6380a3fe1ce648cda0e7e17527296337",
    dishes2: "https://uc.orez.io/f/4b85d04403324cb1accf49aa56edf021",
    blanket2: "https://uc.orez.io/f/b48e74ee719044b8844b544856032df6",
    workstation2: "https://uc.orez.io/f/9c2b6e83ae7d4ece94d0714418aa0e7f",
    diningtable2: "https://uc.orez.io/f/81bfc82d4028423f80188c10176e1f64",
    snow2: "https://uc.orez.io/f/1cd401b087674f10ae67bd9d2fc7198a",
    bedroom2: "https://uc.orez.io/i/b7c26eb7c27848bdbfbb47010b88083d-LargeOriginal",
    kitchen2: "https://uc.orez.io/f/9382362e1e3142bbb0d44bf1d2b9d676",
    fireplace2: "https://uc.orez.io/f/1bc42df403f24f9cad304fffcad00f57",
    neighborhood2: "https://uc.orez.io/f/2980cc05a86f4acb9fe78b0e047edff3",
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

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }

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
            <a href="#gallery" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">gallery</a>
            <a href="#testimonials" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">reviews</a>
            <a href="#location" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">location</a>
            <a href="#booking" className="text-sm font-light hover:text-muted-foreground transition-colors">book</a>
            <a href="#contact" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">contact</a>
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
          className="w-full h-auto object-contain"
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
                <li>• Outdoor dining area</li>
                <li>• Lounge seating</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Carousel */}
      <section id="gallery" className="section-spacing bg-secondary/5">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            explore the cabin
          </h3>
          <PhotoCarousel photos={galleryPhotos} />
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

      {/* Location & Attractions Section */}
      <section id="location" className="section-spacing bg-secondary/5">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            explore the area
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Nearby Attractions */}
            <div>
              <h4 className="text-lg font-medium mb-6">nearby attractions</h4>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Exclusive Blue Lake Springs amenities</p>
                    <p className="text-sm">Pool, private lakes, restaurant, playground, 4 min drive</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Calaveras Big Trees State Park</p>
                    <p className="text-sm">Ancient sequoia groves, 8 min drive</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Lake Alpine</p>
                    <p className="text-sm">Beautiful alpine lake, 35 min drive</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Murphys Historic Town</p>
                    <p className="text-sm">Gold rush era town with wineries, 20 min drive</p>
                  </div>
                </li>                
              </ul>
            </div>

            {/* Outdoor Activities */}
            <div>
              <h4 className="text-lg font-medium mb-6">outdoor activities</h4>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Hiking & Trails</p>
                    <p className="text-sm">Extensive network of forest trails nearby</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Fishing</p>
                    <p className="text-sm">Excellent trout fishing in local streams</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Winter Sports</p>
                    <p className="text-sm">Skiing & snowboarding at Bear Valley Ski Resort</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Wildlife Viewing</p>
                    <p className="text-sm">Deer, bears, and diverse bird species</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            frequently asked
          </h3>
          <FAQAccordion />
        </div>
      </section>

      {/* Booking Widget Section */}
      <section id="booking" className="section-spacing bg-secondary/5">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            book your stay
          </h3>
          <BookingWidget />
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            get in touch
          </h3>

          <form onSubmit={handleContactSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-border rounded-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-border rounded-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactForm.phone}
                onChange={handleContactChange}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 border border-border rounded-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                subject
              </label>
              <select
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
                className="w-full px-4 py-3 border border-border rounded-none bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                <option value="">Select a topic</option>
                <option value="booking">Booking Question</option>
                <option value="amenities">Amenities & Features</option>
                <option value="availability">Availability</option>
                <option value="pricing">Pricing</option>
                <option value="policies">Policies & Rules</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="Tell us what you'd like to know..."
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitInquiry.isPending}
              className="w-full py-3 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitInquiry.isPending ? (
                <span>sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  <span>send message</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">location</h4>
              <p className="text-muted-foreground font-light">
                Arnold, California
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">also on airbnb</h4>
              <a href="https://airbnb.com/h/cabinponderosa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-light hover:text-foreground transition-colors">
                View on Airbnb
              </a>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">follow along</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com/cabinponderosa" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/cabinponderosaarold" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
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
