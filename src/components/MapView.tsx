import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';

interface MapViewProps {
  isMobile?: boolean;
}

const libraries = ['places'];

export const MapView = ({ isMobile }: MapViewProps) => {
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