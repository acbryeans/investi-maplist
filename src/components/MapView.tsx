import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import { Property } from '@/types/property';
import { Badge } from "@/components/ui/badge";

interface MapViewProps {
  isMobile?: boolean;
  properties: Property[];
  onPropertyClick: (property: Property) => void;
}

const libraries = ['places'];

export const MapView = ({ isMobile, properties, onPropertyClick }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(12);

  const mapContainerStyle = useMemo(() => ({
    width: '100%',
    height: isMobile ? 'calc(100% - 80px)' : 'calc(100vh - 10rem)', // Adjusted to make room for title
    borderRadius: isMobile ? '0' : '0.5rem'
  }), [isMobile]);

  const center = useMemo(() => ({
    lat: 30.2672,
    lng: -97.7431,
  }), []);

  const options = useMemo(() => ({
    disableDefaultUI: false,
    zoomControl: true,
    styles: [
      {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ],
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  }), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbn0muf9rXTgntcptHwRipFEn_QtTQeIg",
    libraries: libraries as any,
  });

  const getMarkerSize = (zoomLevel: number) => {
    // Base size that scales with zoom
    const baseSize = Math.max(8, Math.min(14, zoomLevel * 0.8));
    return baseSize;
  };

  const getIconSize = (zoomLevel: number) => {
    // Base marker size that scales with zoom
    const baseSize = Math.max(20, Math.min(32, zoomLevel * 2));
    return baseSize;
  };

  const formatMarkerPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
    return `${Math.round(price / 1000)}k`;
  };

  const createCustomMarkerIcon = (price: number, size: number) => {
    // Create a pill-shaped marker with the price
    const markerPrice = formatMarkerPrice(price);
    const width = Math.max(markerPrice.length * 8 + 16, 40); // Dynamic width based on text length
    
    const svgMarker = {
      path: `M ${width},15 
            a 15,15 0 0 1 -15,15 
            h -${width - 30}
            a 15,15 0 0 1 -15,-15 
            a 15,15 0 0 1 15,-15 
            h ${width - 30}
            a 15,15 0 0 1 15,15 z`,
      fillColor: "#7029D9",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: size / 30,
      anchor: new google.maps.Point(width/2, 15),
      labelOrigin: new google.maps.Point(width/2, 15),
    };
    return svgMarker;
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onZoomChanged={() => {
          const newZoom = map?.getZoom() || 12;
          // Force re-render of markers when zoom changes
          setZoom(newZoom);
        }}
        onLoad={map => setMap(map)}
      >
        {properties.map(property => (
          <Marker
            key={property.id}
            position={{ lat: property.lat, lng: property.lng }}
            label={{
              text: formatMarkerPrice(property.price),
              color: "white",
              fontSize: `${getMarkerSize(zoom)}px`,
              fontWeight: "bold",
              className: "marker-label",
            }}
            icon={createCustomMarkerIcon(property.price, getIconSize(zoom))}
            onClick={() => {
              setSelectedProperty(property);
              onPropertyClick(property);
            }}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className="w-full" style={{ minWidth: 'clamp(140px, 18vw, 280px)' }}>
              <h4 className="font-semibold mb-0.5 text-[clamp(8px,0.9vw,14px)]">
                {selectedProperty.address}
              </h4>
              <p className="text-primary font-semibold mb-0.5 text-[clamp(8px,0.9vw,14px)]">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedProperty.price)}
              </p>
              <div className="flex gap-[clamp(1px,0.15vw,2px)] flex-wrap mb-0.5">
                {selectedProperty.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="secondary"
                    className={`text-[clamp(6px,0.7vw,10px)] py-0 px-[clamp(1px,0.2vw,3px)] ${
                      tag === "High Growth Market" ? "bg-blue-100 text-blue-800" :
                      tag === "Value-Buy" ? "bg-green-100 text-green-800" :
                      tag === "High Cap Rate" ? "bg-purple-100 text-purple-800" :
                      tag === "Fix and Flip" ? "bg-orange-100 text-orange-800" :
                      tag === "Long Time on Market" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <button 
                onClick={() => onPropertyClick(selectedProperty)}
                className="w-full bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                style={{
                  fontSize: 'clamp(7px, 0.8vw, 12px)',
                  padding: 'clamp(1px, 0.3vw, 3px) clamp(2px, 0.4vw, 6px)',
                }}
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};