import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

interface InstallationLocation {
  id: string;
  latitude: number;
  longitude: number;
  site_address: string;
  city: string;
  state: string;
  status: string;
  start_date: string;
}

interface DashboardMapProps {
  locations: InstallationLocation[];
  onLocationClick?: (location: InstallationLocation) => void;
  height?: string;
}

const DashboardMap = ({ locations, onLocationClick, height = "500px" }: DashboardMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map after container is ready
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current).setView([39.8283, -98.5795], 4); // Center of USA

      // Add OpenStreetMap tiles (free)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      mapRef.current = map;

      // Force map to invalidate size to ensure proper rendering
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    if (locations.length === 0) {
      map.setView([39.8283, -98.5795], 4);
      return;
    }

    // Create custom icons based on status
    const createIcon = (status: string) => {
      const colors: { [key: string]: string } = {
        scheduled: '#3b82f6', // blue
        in_progress: '#f59e0b', // orange
        testing: '#8b5cf6', // purple
        completed: '#10b981', // green
      };
      
      const color = colors[status] || '#6b7280';
      
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
    };

    // Add markers for each location
    const bounds: L.LatLngBoundsExpression = [];
    
    locations.forEach(location => {
      if (location.latitude && location.longitude) {
        const marker = L.marker([location.latitude, location.longitude], {
          icon: createIcon(location.status)
        }).addTo(map);
        
        // Add popup with installation details
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">
              ${location.site_address || 'Unknown Address'}
            </h3>
            <p style="margin: 4px 0; font-size: 12px; color: #666;">
              ${location.city ? location.city + ', ' : ''}${location.state || ''}
            </p>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
              <div style="font-size: 12px;">
                <strong>Status:</strong> <span style="text-transform: capitalize;">${location.status}</span>
              </div>
              ${location.start_date ? `
                <div style="font-size: 12px;">
                  <strong>Start Date:</strong> ${new Date(location.start_date).toLocaleDateString()}
                </div>
              ` : ''}
            </div>
          </div>
        `;
        
        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
          if (onLocationClick) {
            onLocationClick(location);
          }
        });
        
        markersRef.current.push(marker);
        bounds.push([location.latitude, location.longitude]);
      }
    });

    // Fit map to show all markers
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [locations, onLocationClick]);

  return (
    <div className="relative w-full">
      <div
        ref={mapContainerRef}
        className="w-full rounded-lg border border-gray-300"
        style={{ height, minHeight: height, width: '100%' }}
      />
      {locations.length === 0 ? (
        <div className="absolute inset-x-0 bottom-4 flex justify-center px-4 pointer-events-none">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/95 px-4 py-2 text-sm text-gray-600 shadow-lg backdrop-blur">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>OpenStreetMap is loaded. No installation markers are available yet.</span>
          </div>
        </div>
      ) : null}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <div className="text-xs font-semibold text-gray-700 mb-2">Status Legend</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-600">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs text-gray-600">Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMap;
