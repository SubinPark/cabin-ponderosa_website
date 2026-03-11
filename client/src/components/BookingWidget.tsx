import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * BookingWidget Component
 * 
 * Integrates OwnerRez booking calendar and payment processing.
 * 
 * To enable the widget:
 * 1. Get your Property ID from OwnerRez (Settings > Properties > [Your Property])
 * 2. Get your Widget ID from OwnerRez (Settings > Widgets > Create Widget)
 * 3. Update the PROPERTY_ID and WIDGET_ID constants below
 * 
 * The widget will display:
 * - Real-time availability calendar
 * - Pricing information
 * - Guest information form
 * - Payment processing (50% due at booking, 50% 30 days before arrival)
 */

interface BookingWidgetProps {
  propertyId?: string;
  widgetId?: string;
  showPlaceholder?: boolean;
}

export function BookingWidget({ 
  propertyId = 'YOUR_PROPERTY_ID',
  widgetId = 'YOUR_WIDGET_ID',
  showPlaceholder = true 
}: BookingWidgetProps) {
  const [isConfigured, setIsConfigured] = useState(propertyId !== 'YOUR_PROPERTY_ID' && widgetId !== 'YOUR_WIDGET_ID');

  // OwnerRez widget embed code
  // The widget will be embedded as an iframe for reliability across different frameworks
  const embedUrl = `https://secure.ownerreservations.com/widgets/${widgetId}?seq=0&propertyKey=${propertyId}`;

  if (!isConfigured && showPlaceholder) {
    return (
      <div className="w-full">
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <CardTitle>Booking Calendar Setup Required</CardTitle>
                <CardDescription>
                  To enable the booking calendar and payment processing, please configure your OwnerRez integration.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/5 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Setup Instructions:</h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-semibold text-accent flex-shrink-0">1.</span>
                  <span>Log in to your OwnerRez account and navigate to <strong>Settings &gt; Widgets</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-accent flex-shrink-0">2.</span>
                  <span>Create a new "Book Now" widget or copy an existing one</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-accent flex-shrink-0">3.</span>
                  <span>Copy your <strong>Property ID</strong> and <strong>Widget ID</strong> from the widget settings</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-accent flex-shrink-0">4.</span>
                  <span>Contact support to update these values in your website configuration</span>
                </li>
              </ol>
            </div>
            
            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-foreground mb-2">What's Included:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  Real-time availability calendar
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  Dynamic pricing based on season
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  Guest information collection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  Secure payment processing (50% at booking, 50% 30 days before)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  Automatic confirmation emails
                </li>
              </ul>
            </div>

            <div className="bg-accent/5 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Payment Terms:</strong> By default, guests pay 50% of the total at booking and the remaining 50% is charged 30 days before arrival. This can be customized in your OwnerRez settings.
              </p>
            </div>

            <Button className="w-full cta-button">
              Contact Us to Enable Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render the OwnerRez widget as an iframe
  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={embedUrl}
          title="Cabin Ponderosa Booking Calendar"
          frameBorder="0"
          scrolling="no"
          seamless
          allowTransparency
          className="w-full"
          style={{
            minHeight: '800px',
            display: 'block',
          }}
        />
      </div>
      
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
