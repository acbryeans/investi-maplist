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
    height: isMobile ? '100%' : 'calc(100vh - 10rem)',
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
          <div className="min-w-[180px]">
            <h4 className="font-semibold mb-1 text-sm">{selectedProperty.address}</h4>
            <p className="text-primary font-semibold mb-1 text-sm">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedProperty.price)}
            </p>
            <div className="flex gap-1 flex-wrap mb-1">
              {selectedProperty.tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className={`text-[10px] py-0 px-1.5 ${
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
              className="w-full bg-primary text-white px-2.5 py-1 rounded-md text-xs hover:bg-primary/90 transition-colors"
            >
              View Details
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};