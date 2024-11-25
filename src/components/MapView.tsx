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
    // Increase base text size
    const baseSize = Math.max(12, Math.min(16, zoomLevel * 1.2));
    return baseSize;
  };

  const getIconSize = (zoomLevel: number) => {
    // Increase base marker size
    const baseSize = Math.max(30, Math.min(45, zoomLevel * 2.5));
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
            }}
            icon={createCustomMarkerIcon(property.price, getIconSize(zoom))}
            onClick={() => {
              setSelectedProperty(property);
            }}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div 
              className="flex h-[200px] w-[400px] cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                onPropertyClick(selectedProperty);
                setSelectedProperty(null);
              }}
            >
              <div className="w-1/3">
                <img 
                  src={selectedProperty.image} 
                  alt={selectedProperty.address}
                  className="h-full w-full object-cover rounded-l"
                />
              </div>
              <div className="flex-1 p-3">
                <div className="mb-2">
                  <div className="font-semibold text-primary text-lg">
                    {new Intl.NumberFormat('en-US', { 
                      style: 'currency', 
                      currency: 'USD',
                      maximumFractionDigits: 0 
                    }).format(selectedProperty.price)}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    {selectedProperty.address}
                  </div>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span>{selectedProperty.beds} beds</span>
                    <span>{selectedProperty.baths} baths</span>
                    <span>{selectedProperty.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Cap Rate</div>
                    <div className="font-semibold text-primary">
                      {selectedProperty.capRate.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Cash on Cash</div>
                    <div className="font-semibold text-primary">
                      {selectedProperty.cashOnCash.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};