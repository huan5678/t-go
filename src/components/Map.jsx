import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useTravelContext } from "../context";
import { PinIcon } from "./Icon";

const mapSet = {
  height: "50vh",
  width: "50vw",
};

const Map = () => {
  const { targetItem } = useTravelContext();

  return (
    <MapContainer
      center={[
        targetItem.Position.PositionLat,
        targetItem.Position.PositionLon,
      ]}
      style={mapSet}
      zoom={16}
    >
      {/* mapbox://styles/huan5678/ckyb5tzl51wzh15lalewekqrn */}
      {/* /styles/v1/{username}/{style_id}/tiles/{tilesize}/{z}/{x}/{y}{@2x} */}
      <TileLayer
        attribution={`Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`}
        url={`https://api.mapbox.com/styles/v1/huan5678/ckyb5tzl51wzh15lalewekqrn/tiles/256/{z}/{x}/{y}@2x?access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`}
      />
      <Marker
        position={[
          targetItem.Position.PositionLat,
          targetItem.Position.PositionLon,
        ]}
      ></Marker>
    </MapContainer>
  );
};

export default Map;
