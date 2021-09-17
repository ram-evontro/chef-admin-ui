import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const Map = ({ zoom, mylat, mylong, setLat, setLong,setZoom }) => {
  const onMarkerDragEnd = (event) => {
    console.log(event);
    setLat(event.latLng.lat());
    setLong(event.latLng.lng());
  };
  const mapClick = (event) => {
    console.log(event);
    setLat(event.latLng.lat());
    setLong(event.latLng.lng());
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap((map) => {
      function zoomChanged() {
        setZoom(this.getZoom());
      }
      return (
        <GoogleMap zoom={zoom} onZoomChanged={zoomChanged} onClick={mapClick} defaultCenter={{ lat: mylat, lng: mylong }}>
          <Marker draggable={true} onDragEnd={onMarkerDragEnd} position={{ lat: mylat, lng: mylong }} />
        </GoogleMap>
      );
    })
  );

  return (
    <div>
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeGvtCVnIAyMWAWdfTpYVjjvU7j9oOYSo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div className="map-item" />}
        containerElement={<div className="map-item" />}
        mapElement={<div className="map-item" />}
      />
    </div>
  );
};
function shouldNotUpdate(props, nextProps) {
  console.log("Old",props);
  console.log("New",nextProps);
  if(props.mylat===nextProps.mylat&&props.mylong===nextProps.mylong)
  {
    return true;
  }
  else
  {
    return false;
  }
  
  
}

export default React.memo(Map, shouldNotUpdate);
