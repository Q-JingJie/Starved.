import React, { Component } from "react";
import { Map, TileLayer, CircleMarker, Popup, Circle } from "react-leaflet";

class DisplayMap extends Component {
  render() {
    const position = [this.props.lat.toFixed(3), this.props.long.toFixed(3)];
    return (
      <Map
        className={this.props.class}
        center={position}
        zoom={14}
        zoomControl={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle
          center={position}
          color="#03ac13"
          fillColor="#03ac13"
          weight={1}
          radius={this.props.searchRadius}
        />
        <CircleMarker
          center={position}
          color="red"
          fillOpacity={1}
          fillColor="white"
          weight={5}
          radius={6}
        >
          <Popup>
            Longitude: {this.props.long.toFixed(3)} <br />
            Latitude: {this.props.lat.toFixed(3)}
          </Popup>
        </CircleMarker>
      </Map>
    );
  }
}

export default DisplayMap;
