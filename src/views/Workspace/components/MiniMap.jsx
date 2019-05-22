import React from "react";
import { connect } from 'react-redux'
import { compose, withProps } from "recompose";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";

import markerGreen from "../../../assets/img/markers/playground-green.png";
import markerWhite from "../../../assets/img/markers/playground-white.png";
import markerBlue from "../../../assets/img/markers/playground-blue.png";
import { getGoogleMapsKey } from "../../../misc/ConfigReducer";


class MiniMap extends React.Component {
    render() {
        return (
          <PlaygroundMapImpl
            {...this.props}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.googleMapsKey}&v=3.exp&libraries=geometry,drawing,places`}
          />
        );
    }
}

const PlaygroundMapImpl = compose(
  withProps({
      loadingElement: <div style={{height: `100%`}}/>,
      containerElement: <div style={{height: `100%`}} className="playground-map"/>,
      mapElement: <div style={{height: `100%`}}/>,
  }),
  window.google ? null : withScriptjs,
  withGoogleMap
)(props => {
    console.log('drawing mini-map');

    const playground = props.playground;

    if (!playground) return null;

    const position = { lat: playground.lat, lng: playground.lng };

    return (
      <div>
          <GoogleMap
            zoom={13}
            center={position}
            defaultOptions={{disableDefaultUI: true, styles: [
                { elementType: "labels", featureType: "poi", stylers: [{ visibility: "off" }] },
                { elementType: "labels", featureType: "road.highway", stylers: [{ visibility: "off" }] }
            ]}}
          >
              <Marker
                position={position}
                icon={playground.status === "NOT_STARTED" ? markerWhite : (playground.status === "IN_PROGRESS" ? markerBlue : markerGreen)}
              />
          </GoogleMap>
      </div>
    )
});

const mapStateToProps = state => ({
    googleMapsKey: getGoogleMapsKey(state),
});

export default connect(mapStateToProps)(MiniMap);
