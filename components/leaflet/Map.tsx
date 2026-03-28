// IMPORTANT: the order matters!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { ElementData } from '@/lib/elements';
import { useEffect, useRef } from 'react';
import * as Leaflet from 'leaflet';

const getCenter = (elements: ElementData[]) =>
  elements.reduce(
    (acc, element) => {
      return [
        acc[0] + element.location.position[0] / elements.length,
        acc[1] + element.location.position[1] / elements.length
      ];
    },
    [0, 0]
  ) as [number, number];

export const Map: React.FC<{ elements: ElementData[]; className: string }> = ({ elements, className }) => {
  return (
    <MapContainer
      className={className}
      center={getCenter(elements)}
      zoom={elements.length > 1 ? 9 : 11}
      scrollWheelZoom={true}
      attributionControl={false}
      zoomControl={false}
      whenReady={
        ((map: { target: Leaflet.Map }) =>
          Leaflet.control
            .zoom({
              position: 'bottomleft'
            })
            .addTo(map.target)) as any
      }
    >
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {elements.map((element) => (
        <Marker position={element.location.position}>
          {/* <Popup>
            <h4>{element.name}</h4>
            <span className="flex flex-col gap-2">
              <p>
                {element.location.country}, {element.location.city}, {element.location.zipCode}
              </p>
              <p>{element.location.address}</p>
            </span>
          </Popup> */}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
