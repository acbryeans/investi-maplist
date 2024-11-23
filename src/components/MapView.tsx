import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import { Property } from '@/types/property';
import { PropertyModal } from './PropertyModal';

// Assign specific coordinates to our demo properties
const PROPERTY_COORDINATES = {
  'p1': { lat: 30.2729, lng: -97.7444 }, // Downtown luxury condo
  'p2': { lat: 30.2982, lng: -97.7481 }, // Hyde Park craftsman
  'p3': { lat: 30.2590, lng: -97.7375 }, // SoCo modern home
  'p4': { lat: 30.2669, lng: -97.7597 }, // Clarksville historic
  'p5': { lat: 30.2814, lng: -97.7269 }, // Mueller new build
  'p6': { lat: 30.2551, lng: -97.7635 }, // Zilker bungalow
  'p7': { lat: 30.2879, lng: -97.7324 }, // North Loop duplex
  'p8': { lat: 30.2461, lng: -97.7547 }, // Barton Hills estate
  'p9': { lat: 30.2752, lng: -97.7702 }, // Tarrytown mansion
  'p10': { lat: 30.2645, lng: -97.7222 } // East Austin modern
};

interface MapViewProps {
  properties: Property[];
  isMobile?: boolean;
  onPropertyClick: (property: Property) => void;
}
/*************  ✨ Codeium Command ⭐  *************/
/**
 * A component that renders a Google Map with markers for each property.
 *
 * It uses the `@react-google-maps/api` library to load the map and display
 * markers. The markers are positioned randomly within a 3-4 mile radius of
 * downtown Austin. The map is rendered in a container that fills the width
 * and height of the parent element.
 *
 * When the map is loading, a message is displayed in the center of the
 * container. When there is an error loading the map, an error message is
 * displayed.
 *
 * @param {Object[]} properties - An array of property objects.
 * @param {boolean} [isMobile] - Whether the component is rendered on a mobile
 * device.
 * @returns {React.ReactElement} - A React component that renders a Google Map.
 */
/******  be88322f-6341-4c27-a2be-3c6538de4fff  *******/
const libraries = ['places'];

export const MapView = ({ properties, isMobile, onPropertyClick }: MapViewProps) => {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);

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
      {properties.map((property) => {
        const coordinates = PROPERTY_COORDINATES[`p${property.id}`];
        if (!coordinates) return null;

        const isHovered = hoveredProperty === property.id;

        return (
          <Marker
            key={property.id}
            position={coordinates}
            onClick={() => onPropertyClick(property)}
            onMouseOver={() => setHoveredProperty(property.id)}
            onMouseOut={() => setHoveredProperty(null)}
            label={{
              text: formatPrice(property.price),
              className: `text-sm ${isHovered ? 'bg-primary text-white' : 'bg-white'} px-2 py-1 rounded shadow transition-all duration-200`,
              color: isHovered ? '#fff' : '#000',
            }}
            options={{
              zIndex: isHovered ? 2 : 1,
              animation: isHovered ? google.maps.Animation.BOUNCE : null
            }}
          />
        );
      })}
    </GoogleMap>
  );
};

export default MapView;