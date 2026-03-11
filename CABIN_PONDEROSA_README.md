# Cabin Ponderosa Website

A premium, modern website for Cabin Ponderosa—a luxury A-frame cabin rental in Arnold, California. The site features a stunning design built with React, Tailwind CSS, and integrated OwnerRez booking and payment processing.

## Design Philosophy

**Modern Alpine Minimalism** — The website combines contemporary web design with the natural beauty of the Sierra Nevada mountains. The design emphasizes:

- **Generous whitespace** and clean typography for a serene, uncluttered experience
- **Warm color palette** inspired by the cabin's wood interiors and forest setting (cream, warm wood tones, forest green, burnt orange)
- **Large, striking photography** showcasing the cabin's exterior, interior, and outdoor spaces
- **Smooth interactions** with minimal distractions, reflecting the peaceful retreat vibe

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cream | #FFFAF5 | Background, primary text |
| Charcoal | #1A1A1A | Headlines, primary text |
| Warm Wood | #8B6F47 | Secondary accents, borders |
| Forest Green | #2D5016 | Primary accent, buttons |
| Burnt Orange | #C85A17 | Call-to-action, highlights |
| Light Beige | #E8DCC8 | Muted backgrounds |

### Typography

- **Headings:** Playfair Display (serif, bold) — elegant and distinctive
- **Body:** Lato (sans-serif, regular/light) — clean and readable
- **Hierarchy:** H1 (48px), H2 (36px), H3 (24px), Body (16px)

## Website Sections

### 1. Navigation & Hero Section
- Sticky navigation with smooth scrolling to key sections
- Full-screen hero image with text overlay (cabin exterior at golden hour)
- Key information: pricing, guest capacity

### 2. About Section
- Introduction to the cabin and its unique features
- Emphasis on the A-frame architecture and natural surroundings
- Call-to-action button linking to booking

### 3. Premium Amenities
- 6 featured amenities with icons (WiFi, fireplace, lake access, etc.)
- Detailed lists of kitchen, comfort, and entertainment features
- Organized by category (General, Sleeping, Bathrooms, Kitchen, etc.)

### 4. Location & Nearby Attractions
- Beautiful image of the cabin's outdoor deck
- Distance and description of nearby attractions:
  - Blue Lake Springs Amenities (4 mins)
  - Calaveras Big Trees State Park (8 mins)
  - Lake Alpine (35 mins)
  - Bear Valley Ski Resort (40 mins)

### 5. Booking & Payment
- **OwnerRez Booking Widget** — Embedded calendar showing real-time availability
- Payment information and house rules
- Winter season notes and security information

### 6. Footer
- Contact information (email, phone)
- Social media links (Facebook, Instagram)
- Copyright and property information

## OwnerRez Integration Setup

The website includes a fully integrated OwnerRez booking widget that displays:
- Real-time availability calendar
- Dynamic pricing based on season
- Guest information form
- Secure payment processing

### To Enable the Booking Widget

1. **Log in to OwnerRez** and navigate to **Settings > Widgets**

2. **Create a new "Book Now" widget** (or use an existing one):
   - Widget Type: "Book Now" or "Inquiry/Quote/Booking"
   - Select your property (Cabin Ponderosa)
   - Configure settings as desired

3. **Copy your IDs**:
   - **Property ID**: Found in Settings > Properties > [Cabin Ponderosa]
   - **Widget ID**: Found in Settings > Widgets > [Your Widget] > Widget ID

4. **Update the website configuration**:
   - Contact the website administrator to add your Property ID and Widget ID
   - The BookingWidget component is located at `client/src/components/BookingWidget.tsx`
   - Update the component to pass your IDs:
     ```tsx
     <BookingWidget 
       propertyId="YOUR_PROPERTY_ID"
       widgetId="YOUR_WIDGET_ID"
       showPlaceholder={false}
     />
     ```

5. **Test the widget** by visiting the website and checking:
   - Calendar displays correctly
   - Availability updates in real-time
   - Payment flow completes successfully

### Payment Processing

By default, OwnerRez is configured with a two-payment schedule:
- **50%** due at booking (to secure the reservation)
- **50%** due 30 days before arrival

This can be customized in your OwnerRez settings under **Payment Processing > Payment Schedule**.

### Widget Customization

The OwnerRez widget can be customized through the OwnerRez dashboard:
- **Colors**: Match your website's color scheme
- **Fields**: Show/hide guest information fields (children, pets, etc.)
- **Quote Display**: Configure when pricing is shown to guests
- **Mode**: Switch between "Book Now" (full bookings) and "Inquiry Only" (inquiry form only)

For detailed widget configuration options, see the [OwnerRez Widget Documentation](https://www.ownerrez.com/support/articles/widget-settings).

## Technical Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4 with custom design tokens
- **UI Components:** shadcn/ui
- **Routing:** Wouter (client-side routing)
- **Build Tool:** Vite
- **Package Manager:** pnpm

## Project Structure

```
client/
  public/           # Static files (favicon, robots.txt)
  src/
    pages/          # Page components
      Home.tsx      # Main landing page
    components/     # Reusable UI components
      BookingWidget.tsx  # OwnerRez booking integration
      ui/           # shadcn/ui components
    contexts/       # React contexts
    lib/            # Utility functions
    App.tsx         # Main app component with routing
    main.tsx        # React entry point
    index.css       # Global styles and design tokens
  index.html        # HTML entry point
```

## Development

### Install Dependencies
```bash
pnpm install
```

### Start Development Server
```bash
pnpm dev
```

The site will be available at `http://localhost:3000`

### Build for Production
```bash
pnpm build
```

### Format Code
```bash
pnpm format
```

## Deployment

The website is deployed on Manus and automatically updates when changes are pushed. To publish new changes:

1. Create a checkpoint of your changes
2. Click the "Publish" button in the Manus dashboard
3. Your website will be live immediately

## Customization Guide

### Updating Property Information

Edit `client/src/pages/Home.tsx`:
- Update property name, description, and rates
- Modify amenities list
- Update nearby attractions and distances
- Change contact information

### Changing Colors

Edit `client/src/index.css`:
- Modify CSS variables in `:root` for light mode
- Modify CSS variables in `.dark` for dark mode
- Update the color palette to match your brand

### Adding More Images

1. Generate or upload images to `/home/ubuntu/webdev-static-assets/`
2. Use `manus-upload-file --webdev` to get CDN URLs
3. Update image URLs in components

### Modifying Typography

Edit `client/src/index.css`:
- Change font imports in the `@import` statement
- Update font-family declarations for headings and body text
- Adjust font sizes in the hierarchy

## Support & Maintenance

### Common Issues

**Booking widget not loading:**
- Verify Property ID and Widget ID are correct
- Check that the widget is enabled in OwnerRez settings
- Clear browser cache and reload

**Images not displaying:**
- Verify CDN URLs are correct
- Check that images are uploaded to the correct location
- Ensure URLs are accessible from your location

**Styling issues:**
- Clear Tailwind CSS cache: `rm -rf .next`
- Rebuild the project: `pnpm build`
- Check that design tokens are properly set in `index.css`

### Updating Content

To update cabin information, amenities, or pricing:
1. Edit `client/src/pages/Home.tsx`
2. Update the relevant sections
3. Test locally with `pnpm dev`
4. Create a checkpoint and publish

### Adding New Pages

1. Create a new component in `client/src/pages/`
2. Add a route in `client/src/App.tsx`
3. Update navigation links in `Home.tsx`

## Contact & Support

For questions about the website or OwnerRez integration, contact:
- **Email:** info@cabinponderosa.com
- **Website:** https://www.cabinponderosa.com

## License

© 2026 Cabin Ponderosa. All rights reserved.
