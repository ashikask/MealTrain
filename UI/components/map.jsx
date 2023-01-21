import React, { Component, createRef } from "react";
// import L from "leaflet";
import { MapContainer, Map, TileLayer, Marker } from "react-leaflet";
// import * as ELG from "esri-leaflet-geocoder";
import LeafletControlGeocoder from "./LeafletControlGeocoder";



const Maps = ({ sendData }) => {
  const resetData = () => {
    console.log("in reset");
    sendData("streetName", "");
    sendData("city", "");
    sendData("state", "");
    sendData("zipcode", "");
    sendData("aptNo", "");
    sendData("name", "");
  };

  const sendGeoData = (value) => {
    console.log(value);
    resetData();
    if (value.road) {
      sendData("streetName", value.road);
    }
    if (value.city) {
      sendData("city", value.city);
    }
    if (value.state) {
      sendData("state", value.state);
    }
    if (value.postcode) {
      sendData("zipcode", value.postcode);
    }
    if (value.house_number) {
      sendData("aptNo", value.house_number);
    }
    if (value.amenity) {
      sendData("name", value.amenity);
    } else if (value.shop) {
      sendData("name", value.shop);
    }
  };

  const position = [51.505, -0.09];
  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ margin: "2px", height: "240px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletControlGeocoder sendGeoData={sendGeoData} />
    </MapContainer>
  );
};

export default Maps;
