import { useLoadScript, GoogleMap } from '@react-google-maps/api';

interface MapViewProps {
  isMobile?: boolean;
}

const center = {
  lat: 30.2672,
  lng: -97.7431
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
};

export const MapView = ({ isMobile }: MapViewProps) => {
  const mapContainerStyle = {
    width: '100%',
    height: isMobile ? '100%' : 'calc(100vh - 10rem)',
    borderRadius: isMobile ? '0' : '0.5rem'
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbn0muf9rXTgntcptHwRipFEn_QtTQeIg"
  });

  if (loadError) return <div className="w-full h-full flex items-center justify-center text-red-500">Error loading maps</div>;
  if (!isLoaded) return <div className="w-full h-full flex items-center justify-center">Loading maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={center}
      options={options}
    />
  );
};