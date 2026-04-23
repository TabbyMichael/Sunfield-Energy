import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  editable?: boolean;
}

const MapComponent = ({ latitude, longitude, onLocationSelect, editable = false }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([latitude || 0, longitude || 0], 13);

    // Add OpenStreetMap tiles (free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Add marker if coordinates are provided
    if (latitude && longitude) {
      const marker = L.marker([latitude, longitude]).addTo(map);
      markerRef.current = marker;
    }

    // Enable click to select location if editable
    if (editable && onLocationSelect) {
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        
        // Remove existing marker
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }
        
        // Add new marker
        const marker = L.marker([lat, lng]).addTo(map);
        markerRef.current = marker;
        
        onLocationSelect(lat, lng);
      });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, editable, onLocationSelect]);

  // Update map view when coordinates change
  useEffect(() => {
    if (mapRef.current && latitude && longitude) {
      mapRef.current.setView([latitude, longitude], 13);
      
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        const marker = L.marker([latitude, longitude]).addTo(mapRef.current);
        markerRef.current = marker;
      }
    }
  }, [latitude, longitude]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-96 rounded-lg border border-gray-300"
      style={{ minHeight: '400px' }}
    />
  );
};

export default MapComponent;
