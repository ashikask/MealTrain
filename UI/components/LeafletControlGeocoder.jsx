import React, { useEffect,useState } from "react";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon.png";
import { useMap } from "react-leaflet";
import icon from '../lib/constants'

const LeafletControlGeocoder = ({sendGeoData}) => {
  const map = useMap();
  const [geoData,setGeoData] = useState({});

  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        setGeoData(e.geocode);
        sendGeoData(e.geocode.properties.address);
      L.marker(latlng,{icon}).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);
  return (
    <div className="container px-1 py-24 w-[100px]">
      
  
  </div>
  );
};

export default LeafletControlGeocoder;