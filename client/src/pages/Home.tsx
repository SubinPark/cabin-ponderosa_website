import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PhotoCarousel } from "@/components/PhotoCarousel";
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
            <a href="#testimonials" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">reviews</a>
            <a href="#location" className="text-sm font-light hover:text-muted-foreground transition-colors hidden md:inline">location</a>
            <Link href="/booking" className="text-sm font-light hover:text-muted-foreground transition-colors">book</Link>
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
              Nestled among towering ponderosa pines in the Sierra Nevada foothills, Cabin Ponderosa is a modern A-frame retreat designed for those seeking peace and natural beauty. The cabin features expansive floor-to-ceiling windows that frame stunning forest views and mountain vistas.
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

      {/* Photo Gallery Carousel */}
      <section className="section-spacing bg-secondary/5">
        <div className="container max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            explore the cabin
          </h3>
          <PhotoCarousel
            photos={[
              { url: images.deck, alt: "Cabin deck with forest view" },
              { url: images.bedroom, alt: "Cabin bedroom" },
              { url: images.kitchen, alt: "Cabin kitchen" },
              { url: images.bathroom, alt: "Cabin bathroom" },
              { url: images.living, alt: "Cabin living room" },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
            ready to escape?
          </h3>

          {/* CTA Buttons */}
          <div className="w-full max-w-md flex flex-col gap-3">
            <Link href="/booking" className="w-full">
              <Button className="w-full py-3 bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>view availability</span>
              </Button>
            </Link>
            <Link href="#contact" className="w-full">
              <Button className="w-full py-3 bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>ask a question</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-secondary/5">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
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
                    <p className="font-medium text-foreground">Blue Lake Springs</p>
                    <p className="text-sm">Beautiful alpine lake, 15 min drive</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Big Trees State Park</p>
                    <p className="text-sm">Ancient sequoia groves, 20 min drive</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <div>
                    <p className="font-medium text-foreground">Calaveras Big Trees Trail</p>
                    <p className="text-sm">Scenic hiking, 25 min drive</p>
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
                    <p className="text-sm">Skiing & snowboarding nearby in winter</p>
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

      {/* Contact Form Section */}
      <section id="contact" className="section-spacing bg-white">
        <div className="container max-w-2xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 mb-12">
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">location</h4>
              <p className="text-muted-foreground font-light">
                Arnold, California
              </p>
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
