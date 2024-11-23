import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import { Property } from '@/types/property';

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
    lng: -97.7431
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

  console.log('Properties:', properties);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={center}
      options={options}
    >
      {properties.map(property => {
        console.log('Rendering Marker for:', property);
        return (
          <Marker
            key={property.id}
            position={{ lat: property.lat, lng: property.lng }}
            onClick={() => {
              setSelectedProperty(property);
              onPropertyClick(property);
            }}
          />
        );
      })}

      {selectedProperty && (
        <InfoWindow
          position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <div>
            <h4>{selectedProperty.address}</h4>
            <p>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedProperty.price)}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};