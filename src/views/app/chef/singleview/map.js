import React, { useEffect } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const Map = ({ zoom, mylat, mylong, setLat, setLong, setZoom, mapKey, autoComplete }) => {
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
      useEffect(() => {
        console.log("fetchin map", autoComplete);
        if (!autoComplete ||!mapKey ) {
          return;
        }
        const searchBox = new google.maps.places.SearchBox(autoComplete.current, { types: ["geocode"] });
        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (places.length > 0) {
            const position = places[0].geometry.location;
            setLat(position.lat());
            setLong(position.lng());
          }
        });
      }, [autoComplete, mapKey]);
      function zoomChanged() {
        setZoom(this.getZoom());
      }
      return (
        <>
          <GoogleMap zoom={zoom} onZoomChanged={zoomChanged} onClick={mapClick} defaultCenter={{ lat: mylat, lng: mylong }}>
            <Marker draggable={true} onDragEnd={onMarkerDragEnd} position={{ lat: mylat, lng: mylong }} />
          </GoogleMap>
        </>
      );
    })
  );

  return (
    <div>
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div className="map-item" />}
        containerElement={<div className="map-item" />}
        mapElement={<div className="map-item" />}
      />
    </div>
  );
};
function shouldNotUpdate(props, nextProps) {
  if (props.mapKey === nextProps.mapKey && props.mylat === nextProps.mylat && props.mylong === nextProps.mylong) {
    return true;
  } else {
    return false;
  }
}

export default React.memo(Map, shouldNotUpdate);
