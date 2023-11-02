import * as React from "react";
import { Map as MapItem, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoIosPin } from "react-icons/io";
import { useState, useEffect, useCallback } from "react";
const MapInForm = (props) => {
  const [longitude, setLongitude] = useState(props.longitude);
  const [latitude, setLatitude] = useState(props.latitude);

  const initialViewState = {
    longitude: longitude,
    latitude: latitude,
    zoom: 15,
  };
  const [viewport, setViewPort] = useState(initialViewState);

  const getPosition = (e) => {
    setLongitude(e.lngLat.lng);
    setLatitude(e.lngLat.lat);
  };

  useEffect(() => {
    props.sendData(longitude, latitude);
  }, [longitude, latitude]);

  useEffect(() => {
    setLongitude(props.longitude);
    setLatitude(props.latitude);
    setViewPort({
      ...initialViewState,
      longitude: props.longitude,
      latitude: props.latitude,
    });
  }, [props.longitude, props.latitude]);
  return (
    <MapItem
      {...viewport}
      initialViewState={initialViewState}
      style={{ width: "100%", height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      onClick={getPosition}
      onViewportChange={(nextViewport) => setViewPort(nextViewport)}
      onMove={(evt) => setViewPort(evt.viewState)}
    >
      <Marker
        longitude={longitude}
        latitude={latitude}
        anchor="bottom"
        style={{ width: "20px" }}
      >
        <IoIosPin style={{ color: "rgb(245, 151, 140)" }} size={45} />
      </Marker>
    </MapItem>
  );
};
export default MapInForm;
