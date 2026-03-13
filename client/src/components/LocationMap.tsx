import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface Attraction {
  name: string;
  description: string;
  lat: number;
  lng: number;
}

const attractions: Attraction[] = [
  {
    name: "Blue Lake Springs",
    description: "Beautiful alpine lake, 15 min drive",
    lat: 38.2,
    lng: -120.45,
  },
  {
    name: "Big Trees State Park",
    description: "Ancient sequoia groves, 20 min drive",
    lat: 38.25,
    lng: -120.5,
  },
  {
    name: "Calaveras Big Trees Trail",
    description: "Scenic hiking, 25 min drive",
    lat: 38.27,
    lng: -120.48,
  },
  {
    name: "Murphys Historic Town",
    description: "Gold rush era town with wineries, 20 min drive",
    lat: 38.18,
    lng: -120.42,
  },
];

const CABIN_LAT = 38.22;
const CABIN_LNG = -120.46;

let googleMapsScriptPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
  if (googleMapsScriptPromise) {
    return googleMapsScriptPromise;
  }

  googleMapsScriptPromise = new Promise((resolve, reject) => {
    // Check if script is already loaded
    if ((window as any).google?.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      reject(new Error("Google Maps API key not configured"));
      return;
    }

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      googleMapsScriptPromise = null;
      reject(new Error("Failed to load Google Maps script"));
    };

    document.head.appendChild(script);
  });

  return googleMapsScriptPromise;
}

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initializeMap = async () => {
      try {
        // Load Google Maps script
        await loadGoogleMapsScript();

        if (!mapRef.current) return;

        const google = (window as any).google;
        if (!google?.maps) {
          throw new Error("Google Maps not available");
        }

        // Create map
        const map = new google.maps.Map(mapRef.current, {
          zoom: 11,
          center: { lat: CABIN_LAT, lng: CABIN_LNG },
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#666666" }],
            },
          ],
        });

        mapInstanceRef.current = map;

        // Add cabin marker
        const cabinMarker = new google.maps.Marker({
          position: { lat: CABIN_LAT, lng: CABIN_LNG },
          map,
          title: "Cabin Ponderosa",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#000000",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        const cabinInfoWindow = new google.maps.InfoWindow({
          content: "<div><strong>Cabin Ponderosa</strong><br/>Your mountain retreat</div>",
        });

        cabinMarker.addListener("click", () => {
          // Close all other info windows
          markersRef.current.forEach((m) => {
            if (m.infoWindow) m.infoWindow.close();
          });
          cabinInfoWindow.open(map, cabinMarker);
        });

        // Add attraction markers
        attractions.forEach((attraction) => {
          const marker = new google.maps.Marker({
            position: { lat: attraction.lat, lng: attraction.lng },
            map,
            title: attraction.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#8b6f47",
              fillOpacity: 0.8,
              strokeColor: "#ffffff",
              strokeWeight: 1,
            },
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div><strong>${attraction.name}</strong><br/>${attraction.description}</div>`,
          });

          marker.addListener("click", () => {
            // Close all other info windows
            markersRef.current.forEach((m) => {
              if (m.infoWindow) m.infoWindow.close();
            });
            cabinInfoWindow.close();
            infoWindow.open(map, marker);
          });

          (marker as any).infoWindow = infoWindow;
          markersRef.current.push(marker);
        });

        setMapLoaded(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load map";
        console.error("Map initialization error:", err);
        setError(message);
        setMapLoaded(false);
      }
    };

    initializeMap();

    return () => {
      // Cleanup on unmount
      try {
        if (mapInstanceRef.current) {
          markersRef.current.forEach((marker) => {
            marker.setMap(null);
          });
          markersRef.current = [];
          mapInstanceRef.current = null;
        }
      } catch (err) {
        console.error("Error during cleanup:", err);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-64 sm:h-80 md:h-96 lg:h-screen rounded-none border border-border bg-secondary/5 flex items-center justify-center flex-col gap-4">
        <MapPin className="w-8 h-8 text-muted-foreground" />
        <p className="text-muted-foreground text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-64 sm:h-80 md:h-96 lg:h-screen rounded-none border border-border bg-secondary/5 flex items-center justify-center"
      >
        {!mapLoaded && (
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-8 h-8 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        )}
      </div>

      {/* Legend */}
      {mapLoaded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-black border-2 border-white"></div>
            <span className="text-muted-foreground">Cabin Ponderosa</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#8b6f47] border border-white"></div>
            <span className="text-muted-foreground">Nearby Attractions</span>
          </div>
        </div>
      )}
    </div>
  );
}
