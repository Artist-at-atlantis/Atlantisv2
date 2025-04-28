import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// This would normally come from environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'your_mapbox_token_here';
mapboxgl.accessToken = MAPBOX_TOKEN;

// Realm definitions from the knowledge base
const REALMS = [
  { id: 'realmAtlanteanRuins', name: 'Atlantean Ruins', coords: [10, 20] },
  { id: 'realmMachineArchipelago', name: 'Machine Archipelago', coords: [-30, 40] },
  { id: 'realmCryptoRepublic', name: 'Crypto Republic', coords: [50, -10] },
  { id: 'realmCoralForest', name: 'Coral Forest', coords: [0, 0] },
  { id: 'realmSunkenLibrary', name: 'Sunken Library', coords: [20, -30] },
  { id: 'realmIronCitadel', name: 'Iron Citadel', coords: [-20, -20] },
  { id: 'realmVeiledSpring', name: 'Veiled Spring', coords: [30, 10] }
];

export default function AtlasMap() {
  const mapNode = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapNode.current) return;

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Using a dark style as base
      center: [0, 20],
      zoom: 1.5,
      attributionControl: false
    });
    
    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      // Add custom fog layer to create the "fog of war" effect
      map.addSource('realms', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: REALMS.map(realm => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: realm.coords
            },
            properties: {
              id: realm.id,
              name: realm.name
            }
          }))
        }
      });

      // Add fog layer (semi-transparent overlay)
      map.addLayer({
        id: 'fog-layer',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]
              ]]
            }
          }
        },
        paint: {
          'fill-color': '#0a0f15',
          'fill-opacity': 0.7
        }
      });

      // Add realm markers
      map.addLayer({
        id: 'realm-markers',
        type: 'circle',
        source: 'realms',
        paint: {
          'circle-radius': 8,
          'circle-color': '#22d3ee',
          'circle-opacity': 0.8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#e5e7eb'
        }
      });

      // Add realm labels
      map.addLayer({
        id: 'realm-labels',
        type: 'symbol',
        source: 'realms',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Bold'],
          'text-size': 12,
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#e5e7eb',
          'text-halo-color': '#0a0f15',
          'text-halo-width': 1
        }
      });

      // Add click handler for realms
      map.on('click', 'realm-markers', async (e) => {
        const realmId = e.features[0].properties.id;
        const realmName = e.features[0].properties.name;
        
        try {
          const res = await fetch('/api/lore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ realmId })
          });
          
          if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
          }
          
          const { lore } = await res.json();
          
          // Create and display popup
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="p-2">
                <h3 class="text-lg font-bold text-cyan-300">${realmName}</h3>
                <p class="text-sm italic text-gray-200">${lore}</p>
              </div>
            `)
            .addTo(map);
            
        } catch (error) {
          console.error("Failed to fetch realm lore:", error);
          
          // Display error popup
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="p-2">
                <h3 class="text-lg font-bold text-cyan-300">${realmName}</h3>
                <p class="text-sm italic text-gray-200">The ancient knowledge of this realm is currently veiled...</p>
              </div>
            `)
            .addTo(map);
        }
      });
      
      // Change cursor on hover
      map.on('mouseenter', 'realm-markers', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      
      map.on('mouseleave', 'realm-markers', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-cyan-500/30 shadow-lg">
      <div ref={mapNode} className="w-full h-full" />
    </div>
  );
}
