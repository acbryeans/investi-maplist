import { useLoadScript, GoogleMap } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 10rem)',
  borderRadius: '0.5rem'
};

const center = {
  lat: 30.2672,
  lng: -97.7431
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
};

export const MapView = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbn0muf9rXTgntcptHwRipFEn_QtTQeIg" // Replace with your API key
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={center}
      options={options}
    />
  );
};