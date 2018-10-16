import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

// const fetch = require("isomorphic-fetch");
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withHandlers, withProps} from "recompose";

const PlaygroundMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDCX2YMrZPjKtWq0tEBviJedUfx-mdFiPs&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
        playgrounds: [
            {id: '1', name: 'Linnaeushof', lat: 52.327292, lng: 4.603781, slug: this.name + ' Rookvrij'},
            {id: '2', name: 'Jan Miense Molenaerplein 12', lat: 52.359360, lng: 4.627239, slug: this.name + ' Rookvrij'}
        ],
        selectPlayground: (playground_id) => {
            alert('Hi!' + playground_id);
        }
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
            {props.playgrounds.map(playground => (
                <Marker
                    onClick={props.selectPlayground.bind(this, playground.id)}
                    key={playground.id}
                    position={{lat: playground.lat, lng: playground.lng}}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

export default withStyles(componentsStyle)(PlaygroundMap);
