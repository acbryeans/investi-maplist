import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map only once
    if (!map.current) {
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
        const newMap = new mapboxgl.Map(mapConfig);
        
        // Add event listeners for debugging
        newMap.on('load', () => {
          console.log('Map loaded successfully');
        });

        newMap.on('error', (e) => {
          console.error('Mapbox error:', e);
        });

        newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current = newMap;
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    // Cleanup function
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