import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import {connect} from "react-redux";
import { selectPlayground } from "../../../redux/actions/index";

// const fetch = require("isomorphic-fetch");
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withHandlers, withProps} from "recompose";


// Redux
const mapStateToProps = state => {
    return {
        playgrounds: state.playgrounds.map(playground => ({
            id: playground.id,
            latitude: playground.lat,
            longitude: playground.lng,
            slug: playground.slug
        }))
    };
};
const mapDispatchToProps = dispatch => {
    return {
        selectPlayground: (id, marker)  => {
            console.log('Marker with ID ' + id +' clicked:', marker);
            dispatch(selectPlayground(id))
        }
    };
};

const ClusteredMarkerMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDCX2YMrZPjKtWq0tEBviJedUfx-mdFiPs&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers();
            console.log(`Current clicked markers length: ${clickedMarkers.length}`);
            console.log(clickedMarkers)
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 52.327292, lng: 4.603781 }}>
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.playgrounds.map(marker => (
                <Marker
                    onClick={props.selectPlayground.bind(this, marker.id)}
                    key={marker.id}
                    position={{lat: marker.latitude, lng: marker.longitude}}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

const PlaygroundMap = connect(mapStateToProps, mapDispatchToProps)(ClusteredMarkerMap);
export default withStyles(componentsStyle)(PlaygroundMap);
