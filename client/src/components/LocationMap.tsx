import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface Attraction {
  name: string;
  lat: number;
  lng: number;
  type: 'activity' | 'dining' | 'attraction';
  distance: string;
}

const attractions: Attraction[] = [
  {
    name: "Cabin Ponderosa",
    lat: 38.2456,
    lng: -120.4789,
    type: 'activity',
    distance: "You are here"
  },
  {
    name: "Blue Lake Springs",
    lat: 38.2523,
    lng: -120.4856,
    type: 'activity',
    distance: "4 mins"
  },
  {
    name: "Calaveras Big Trees State Park",
    lat: 38.2789,
    lng: -120.4523,
    type: 'attraction',
    distance: "8 mins"
  },
  {
    name: "Lake Alpine",
    lat: 38.3456,
    lng: -120.3789,
    type: 'activity',
    distance: "35 mins"
  },
  {
    name: "Bear Valley Ski Resort",
    lat: 38.4123,
    lng: -120.2456,
    type: 'activity',
    distance: "40 mins"
  },
  {
    name: "Moaning Caverns",
    lat: 38.1234,
    lng: -120.5123,
    type: 'attraction',
    distance: "25 mins"
  },
];

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is available
    if (typeof google === 'undefined' || !google.maps) {
      setMapLoaded(false);
      return;
    }

    if (!mapRef.current) return;

    try {
      // Initialize map
      const map = new google.maps.Map(mapRef.current, {
        zoom: 11,
        center: { lat: 38.2456, lng: -120.4789 },
        styles: [
          {
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{ color: '#616161' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e0e0e0' }],
          },
        ],
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);

      // Clear previous markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add markers for each attraction
      attractions.forEach((attraction) => {
        const markerColor = attraction.type === 'activity' ? '#2c3e50' : '#7f8c8d';
        const isMainLocation = attraction.name === 'Cabin Ponderosa';

        const marker = new google.maps.Marker({
          position: { lat: attraction.lat, lng: attraction.lng },
          map: map,
          title: attraction.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: isMainLocation ? 12 : 8,
            fillColor: isMainLocation ? '#2c3e50' : markerColor,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; font-family: 'Lato', sans-serif; font-size: 14px;">
              <p style="margin: 0 0 4px 0; font-weight: 500;">${attraction.name}</p>
              <p style="margin: 0; color: #666; font-size: 12px;">${attraction.distance}</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          // Close all other info windows
          markersRef.current.forEach(m => {
            if (m !== marker) {
              (m as any).infoWindow?.close();
            }
          });
          infoWindow.open(map, marker);
        });

        (marker as any).infoWindow = infoWindow;
        markersRef.current.push(marker);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapLoaded(false);
    }

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, []);

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-64 sm:h-80 md:h-96 lg:h-screen rounded-none border border-border bg-secondary/5 flex items-center justify-center"
      >
        {!mapLoaded && (
          <div className="text-center">
            <p className="text-muted-foreground font-light">Loading map...</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div>
          <h4 className="text-base sm:text-lg font-medium mb-4">nearby attractions</h4>
          <div className="space-y-3">
            {attractions.slice(1).map((attraction) => (
              <div key={attraction.name} className="flex items-start gap-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-xs sm:text-sm">{attraction.name}</p>
                  <p className="text-xs text-muted-foreground font-light">{attraction.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-secondary/5 p-4 sm:p-6 rounded-none border border-border">
          <h4 className="text-base sm:text-lg font-medium mb-4">location details</h4>
          <div className="space-y-4 text-xs sm:text-sm font-light text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">address</p>
              <p>Arnold, CA 95223<br />Sierra Nevada, California</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">elevation</p>
              <p>4,200 ft above sea level</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">nearest town</p>
              <p>Arnold (5 mins)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
