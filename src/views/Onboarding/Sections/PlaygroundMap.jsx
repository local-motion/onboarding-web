import React from "react";
// import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { compose, withStateHandlers, withProps } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import markerGray from "assets/img/markers/playground_gray.png";
import markerGreen from "assets/img/markers/playground_green.png";
// import markerPink from "assets/img/markers/playground_pink.png";

const MAP_API_KEY = "AIzaSyDCX2YMrZPjKtWq0tEBviJedUfx-mdFiPs";

const GET_PLAYGROUNDS = gql`
  {
    playgrounds {
      id
      name
      lng
      lat
      status
      volunteerCount
      votes
    }
  }
`;

const withPlaygrounds = graphql(GET_PLAYGROUNDS, {
    // `ownProps` are the props passed into `MyComponentWithData`
    // `data` is the result data (see above)
    props: ({ownProps, data}) => {
        if(data.loading) return {playgroundsLoading: true};
        if(data.error) return {hasErrors: true};
        console.log(data);
        return {
            playgrounds: data.playgrounds.map(playground => {
                return {
                    id: playground.id,
                    name: playground.name,
                    lat: playground.lat,
                    lng: playground.lng,
                    vol: playground.volunteerCount,
                    votes: playground.votes,
                    slug: playground.name + " Rookvrij"
                };
            })
        };
    }
});

const PlaygroundMap = compose(
    withProps({
        googleMapURL:
            `https://maps.googleapis.com/maps/api/js?key=${ MAP_API_KEY }&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}} className="playground-map"/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withStateHandlers(
        () => ({
            isMarkerShown: false,
            newPin: null,
        }), {
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
    <GoogleMap
        zoom={props.zoom}
        center={props.center}
        onClick={props.onMapClick, props.onCreatePlayground}
        defaultOptions={{disableDefaultUI: true}}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick.bind(this)}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {!props.playgroundsLoading &&
            props.playgrounds &&
            props.playgrounds.map(playground => (
                <Marker
                    onClick={props.onPlaygroundChange.bind(this, playground)}
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
));

const PlaygroundMapWithData = withPlaygrounds(PlaygroundMap);

export default withStyles(componentsStyle)(PlaygroundMapWithData);
