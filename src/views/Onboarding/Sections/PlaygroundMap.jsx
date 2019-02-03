import React from "react";
// import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { compose, withStateHandlers, withProps } from "recompose";

import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import markerGray from "assets/img/markers/playground_gray.png";
import markerGreen from "assets/img/markers/playground_green.png";
// import markerPink from "assets/img/markers/playground_pink.png";
import { connect } from 'react-redux'
import { ensurePlaygrounds } from "../../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../../components/Playground/PlaygroundReducer";

const MAP_API_KEY = "AIzaSyCsy6bZ_CvGdeFBOTSDkN0gPqVK9iKDfQ8";



class PlaygroundMap extends React.Component {

    componentDidMount() {
        this.props.ensurePlaygrounds()
      }

    render() {
        return (<PlaygroundMapImpl {...this.props} />)
    }
}

const mapStateToProps = state => ({
    playgrounds: getAllPlaygrounds(state).map(playground => ({
            id: playground.id,
            name: playground.name,
            lat: playground.lat,
            lng: playground.lng,
            vol: playground.volunteerCount,
            votes: playground.votes,
            slug: playground.name + " Rookvrij",
            zoom: 18,
            default: false,
    }) )
})

const mapDispatchToProps = dispatch => {
    return {
        ensurePlaygrounds:    () =>     dispatch(ensurePlaygrounds()),
      }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(PlaygroundMap));




const PlaygroundMapImpl = compose(
    withProps({
        googleMapURL:
            `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
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
)(props => (
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
            defaultOptions={{disableDefaultUI: true}}
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
                    icon={markerGreen}
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
));



