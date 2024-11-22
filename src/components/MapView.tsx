import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Create a local function to handle map initialization
    const initializeMap = async () => {
      if (!mapContainer.current || map.current) return;

      // Set the token
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXVzaXRuYnJ5ZWFucyIsImEiOiJjTN0MDk1cmgwM2x6Mmlvc2w3aDk5enYxIn0.d1mm9bIdw5zbL6_gLBRk8Q';
      
      // Create map configuration
      const mapConfig = {
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-97.7431, 30.2672],
        zoom: 11
      };

      // Initialize map with configuration
      try {
        const newMap = await new Promise<mapboxgl.Map>((resolve) => {
          const mapInstance = new mapboxgl.Map(mapConfig);
          mapInstance.on('load', () => resolve(mapInstance));
        });

        // Add controls after map is loaded
        newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current = newMap;
      } catch (error) {
        console.error('Map initialization error:', error);
      }
    };

    // Call the initialization function
    initializeMap();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: 'calc(100vh - 10rem)' }}
    />
  );
};