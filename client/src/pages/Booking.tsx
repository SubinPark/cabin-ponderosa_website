import { useEffect } from "react";
import { BookingWidget } from "@/components/BookingWidget";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

/**
 * Booking Page
 * 
 * Dedicated page for the OwnerRez booking calendar and payment processing.
 * Minimalist design with focus on the booking widget.
 */

export default function Booking() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white text-foreground" id="booking-page">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light">back</span>
          </Link>
          <h1 className="text-2xl font-light tracking-wide">cabin ponderosa</h1>
          <div className="w-12" /> {/* Spacer for alignment */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12" id="booking-content">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16" id="booking-header">
            <h2 className="text-4xl md:text-5xl font-light mb-4 leading-tight">
              reserve your retreat
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-light max-w-2xl">
              Check availability and complete your booking. A 50% deposit secures your dates, with the remaining balance due 30 days before arrival.
            </p>
          </div>

          {/* Booking Widget */}
          <div className="mb-16">
            <BookingWidget />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-12">
            <div>
              <h3 className="text-lg font-medium mb-4">cancellation policy</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Cancellations made 60+ days before arrival receive a full refund. Cancellations within 60 days forfeit the deposit. Cancellations within 30 days forfeit all payments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">check-in & check-out</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Check-in is at 4:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request. Please contact us to inquire.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-12 border-t border-border">
            <h3 className="text-lg font-medium mb-4">questions?</h3>
            <p className="text-sm text-muted-foreground font-light mb-4">
              Have questions about your booking or need assistance? 
              <Link href="/contact" className="ml-1 underline hover:text-foreground transition-colors">
                Contact us directly
              </Link>
            </p>
          </div>
        </div>
      </main>

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
