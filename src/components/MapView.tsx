import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // Delay map initialization slightly to avoid conflicts
    const timer = setTimeout(() => {
      if (!mapContainer.current || mapInitialized) return;

      try {
        mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNxOXB2NWowMGRqMmpxdDV5Z3E0ZWd2In0.MdhTNHPY6EhKjZnXQm6Kiw';
        
        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-97.7431, 30.2672],
          zoom: 11,
          interactive: true,
          preserveDrawingBuffer: true // Add this to help with rendering
        });

        newMap.on('load', () => {
          map.current = newMap;
          setMapInitialized(true);
        });

        const nav = new mapboxgl.NavigationControl({
          visualizePitch: true
        });
        newMap.addControl(nav, 'top-right');

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100); // Small delay to avoid initialization conflicts

    return () => {
      clearTimeout(timer);
      if (map.current && mapInitialized) {
        map.current.remove();
        map.current = null;
        setMapInitialized(false);
      }
    };
  }, [mapInitialized]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg"
      style={{ 
        minHeight: 'calc(100vh - 10rem)',
        position: 'relative',
        opacity: mapInitialized ? 1 : 0.5, // Visual feedback for initialization
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};