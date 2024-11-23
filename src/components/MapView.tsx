import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

// These coordinates are within ~3-4 miles of downtown Austin
const AUSTIN_COORDINATES = [
  { lat: 30.2729, lng: -97.7444 }, // Downtown
  { lat: 30.2982, lng: -97.7481 }, // Hyde Park
  { lat: 30.2590, lng: -97.7375 }, // South Congress
  { lat: 30.2669, lng: -97.7597 }, // Clarksville
  { lat: 30.2814, lng: -97.7269 }, // Mueller
  { lat: 30.2551, lng: -97.7635 }, // Zilker
  { lat: 30.2879, lng: -97.7324 }, // North Loop
  { lat: 30.2461, lng: -97.7547 }, // Barton Hills
  { lat: 30.2752, lng: -97.7702 }, // Tarrytown
  { lat: 30.2645, lng: -97.7222 }  // East Austin
];

interface MapViewProps {
  properties: any[];
  isMobile?: boolean;
}

const libraries = ['places'];

const MapView = ({ properties, isMobile }: MapViewProps) => {
  const mapContainerStyle = useMemo(() => ({
    width: '100%',
    height: isMobile ? '100%' : 'calc(100vh - 10rem)',
    borderRadius: isMobile ? '0' : '0.5rem'
  }), [isMobile]);

  const center = useMemo(() => ({
    lat: 30.2672, // Austin city center
    lng: -97.7431
  }), []);

  const options = useMemo(() => ({
    disableDefaultUI: false,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ],
    clickableIcons: false,
  }), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbn0muf9rXTgntcptHwRipFEn_QtTQeIg",
    libraries: libraries as any,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        Error loading maps
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading maps...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
    >
      {properties.map((property, index) => (
        <Marker
          key={property.id}
          position={AUSTIN_COORDINATES[index % AUSTIN_COORDINATES.length]}
          label={{
            text: formatPrice(property.price),
            className: 'text-sm bg-white px-2 py-1 rounded shadow',
            color: '#000',
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;