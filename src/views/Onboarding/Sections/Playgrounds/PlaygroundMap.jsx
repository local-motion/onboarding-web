import React from "react";
// import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { compose, withStateHandlers, withProps } from "recompose";

import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import markerGray from "assets/img/markers/playground-gray.svg";
import markerGreen from "assets/img/markers/playground-green.svg";
import markerWhite from "assets/img/markers/playground-white.svg";
import markerBlue from "assets/img/markers/playground-blue.svg";
import { connect } from 'react-redux'
import { ensurePlaygrounds } from "../../../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../../../components/Playground/PlaygroundReducer";
import { getGoogleMapsKey } from "../../../../misc/ConfigReducer";


class PlaygroundMap extends React.Component {

    render() {
        return (<PlaygroundMapImpl {...this.props} googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.googleMapsKey}&v=3.exp&libraries=geometry,drawing,places`}/>)
    }
}

const mapStateToProps = state => ({
    playgrounds: getAllPlaygrounds(state),
    googleMapsKey: getGoogleMapsKey(state),
})

const mapDispatchToProps = dispatch => {
    return {
        ensurePlaygrounds:    () =>     dispatch(ensurePlaygrounds()),
      }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(PlaygroundMap));




const PlaygroundMapImpl = compose(
    withProps({
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}} className="playground-map"/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withStateHandlers(
        () => ({ isMarkerShown: false, newPin: null }), 
        {
            onMapClick: () => (e) => ({
                newPin: e.latLng,
                isMarkerShown: true
            }),
            onMarkerClustererClick: () => markerClusterer => {
                const clickedMarkers = markerClusterer.getMarkers();
                console.log(`Current clicked markers length: ${clickedMarkers.length}`);
                console.log(clickedMarkers);
            }
        }
    ),
    withScriptjs,
    withGoogleMap
)(props => {
    console.log('drawing map')
    return (
    <div>
        <GoogleMap
            zoom={props.zoom}
            center={props.center}
            onClick={function(e) {
                if(!props.viewOnly) {
                    props.onPlaygroundCreated(e);
                    props.onMapClick(e);
                }
            }}
            defaultOptions={{disableDefaultUI: true, styles: [{ elementType: "labels", featureType: "poi", stylers: [{ visibility: "off" }] }]}}
        >

            <MarkerClusterer
                onClick={props.onMarkerClustererClick.bind(this)}
                averageCenter
                enableRetinaIcons
                gridSize={60}
            >

            { props.playgrounds &&
            props.playgrounds.map(playground => (
                <Marker
                    onClick={
                        props.onPlaygroundChange.bind(this, playground)
                    }
                    key={playground.id}
                    position={{lat: playground.lat, lng: playground.lng}}
                    icon={playground.status === "NOT_STARTED" ? markerWhite : (playground.status === "IN_PROGRESS" ? markerBlue : markerGreen)}
                />
            ))}
            

            {props.isMarkerShown &&
                <Marker
                    position={props.newPin}
                    icon={markerGray}
                />
            }
            </MarkerClusterer>
        </GoogleMap>

    </div>
)
})
