import { useState } from "react";
import { ChevronLeft, Send } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

/**
 * Contact Page
 * 
 * Simple contact form for guest inquiries.
 * Sends messages via tRPC backend to owner notifications.
 */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submitInquiry = trpc.contact.submitInquiry.useMutation({
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Submit via tRPC
    await submitInquiry.mutateAsync(formData);
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
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
      <main className="pt-24 pb-12">
        <div className="container max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 leading-tight">
              get in touch
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-light">
              Have questions about the cabin or need more information? We'd love to hear from you. Fill out the form below and we'll respond within 24 hours.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.subject}
                onChange={handleChange}
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
                value={formData.message}
                onChange={handleChange}
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
                <>
                  <span>sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  <span>send message</span>
                </>
              )}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-12">
            <div>
              <h3 className="text-lg font-medium mb-4">email</h3>
              <a href="mailto:info@cabinponderosa.com" className="text-muted-foreground font-light hover:text-foreground transition-colors">
                info@cabinponderosa.com
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">location</h3>
              <p className="text-muted-foreground font-light">
                Arnold, CA 95223<br />
                Sierra Nevada, California
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12 mt-16">
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
