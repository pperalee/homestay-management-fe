import { Map as MapItem, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoIosPin } from "react-icons/io";
const MapView = (props) => {
  const initialViewState = {
    longitude: props.longitude,
    latitude: props.latitude,
    zoom: 15,
  };
  return (
    <MapItem
      initialViewState={initialViewState}
      style={{ width: "100%", height: "400px", margin: "15px 0px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
    >
      <Marker
        longitude={props.longitude}
        latitude={props.latitude}
        anchor="bottom"
        style={{ width: "20px" }}
      >
        <IoIosPin style={{ color: "rgb(245, 151, 140)" }} size={45} />
      </Marker>
    </MapItem>
  );
};
export default MapView;
