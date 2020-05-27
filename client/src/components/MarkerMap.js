import React, { Component } from "react";
import { Map, TileLayer, CircleMarker, Marker } from "react-leaflet";

class MarkerMap extends Component {
  render() {
    const position = [this.props.lat.toFixed(3), this.props.long.toFixed(3)];
    const locPose = [
      this.props.locLat.toFixed(3),
      this.props.locLong.toFixed(3),
    ];

    return (
      <Map className="marker-map" center={position} zoom={14}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <CircleMarker
          center={position}
          color="red"
          fillOpacity={1}
          fillColor="white"
          weight={5}
          radius={6}
        ></CircleMarker>
        <Marker position={locPose}></Marker>
      </Map>
    );
  }
}

export default MarkerMap;
