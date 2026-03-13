import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * BookingWidget Component
 * 
 * Integrates OwnerRez booking calendar and payment processing.
 * Uses the official OwnerRez widget embed code for maximum compatibility.
 * 
 * Property ID: 1582d7a8abe04fc6bfcb069d4c7bf865
 * Widget ID: 03056d705e794bb199dd93c1dfeb3b1e
 * Widget Type: Booking/Inquiry
 */

export function BookingWidget() {
  useEffect(() => {
    // Check if OwnerRez widget script is already loaded
    const existingScript = document.querySelector('script[src="https://app.ownerrez.com/widget.js"]');
    if (existingScript) {
      return; // Script already loaded, don't load again
    }

    // Dynamically load the OwnerRez widget script
    const script = document.createElement('script');
    script.src = 'https://app.ownerrez.com/widget.js';
    script.async = true;
    script.defer = true;
    
    try {
      document.body.appendChild(script);
    } catch (error) {
      console.error('Failed to append OwnerRez widget script:', error);
    }

    // Don't remove the script on unmount - OwnerRez widgets persist across component lifecycle
    return () => {
      // No cleanup needed for OwnerRez script
    };
  }, []);

  return (
    <div className="w-full">
      {/* OwnerRez Widget Container */}
      <div 
        className="ownerrez-widget bg-card border border-border rounded-lg overflow-hidden shadow-lg p-4"
        data-propertyId="1582d7a8abe04fc6bfcb069d4c7bf865"
        data-widget-type="Booking/Inquiry"
        data-widgetId="03056d705e794bb199dd93c1dfeb3b1e"
        style={{ minHeight: '600px' }}
      />
      
      <div className="mt-8 p-6 bg-secondary/5 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Booking Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Payment Schedule</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>50%</strong> due at booking (to secure your dates)</li>
              <li>• <strong>50%</strong> due 30 days before arrival</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">What's Included</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Entire cabin for your exclusive use</li>
              <li>• All amenities and utilities</li>
              <li>• Linens and towels</li>
              <li>• Confirmation email with check-in details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
