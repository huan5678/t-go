import React from 'react';
import {MapContainer, TileLayer, Marker} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import {useTravelContext} from '../context';

const mapSet = {
  height: '50vh',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
};

const Map = () => {
  const {targetItem} = useTravelContext();

  return (
    <div style={{...mapSet}}>
      <MapContainer
        center={[targetItem.Position.PositionLat, targetItem.Position.PositionLon]}
        style={{height: '100%', width: '100%'}}
        zoom={16}
      >
        <TileLayer
          attribution={`Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        <Marker
          position={[targetItem.Position.PositionLat, targetItem.Position.PositionLon]}
        ></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
