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
  }), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbn0muf9rXTgntcptHwRipFEn_QtTQeIg",
    libraries: libraries as any,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="text-center mb-4">
        <h1 className="text-primary text-4xl font-bold">Picket</h1>
        <p className="text-primary/80 text-sm">Find Your Next Investment</p>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
      >
        {properties.map(property => (
          <Marker
            key={property.id}
            position={{ lat: property.lat, lng: property.lng }}
            label={{
              text: `$${(property.price / 1000).toFixed(0)}k`,
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              labelOrigin: new window.google.maps.Point(15, 10),
            }}
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
            <div className="w-full" style={{ minWidth: 'clamp(160px, 20vw, 300px)' }}>
              <h4 className="font-semibold mb-0.5 text-[clamp(10px,1.2vw,16px)]">
                {selectedProperty.address}
              </h4>
              <p className="text-primary font-semibold mb-0.5 text-[clamp(10px,1.2vw,16px)]">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedProperty.price)}
              </p>
              <div className="flex gap-[clamp(1px,0.2vw,3px)] flex-wrap mb-0.5">
                {selectedProperty.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="secondary"
                    className={`text-[clamp(7px,0.9vw,12px)] py-0 px-[clamp(2px,0.3vw,4px)] ${
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
                  fontSize: 'clamp(8px, 1vw, 14px)',
                  padding: 'clamp(1px, 0.4vw, 4px) clamp(4px, 0.6vw, 8px)',
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