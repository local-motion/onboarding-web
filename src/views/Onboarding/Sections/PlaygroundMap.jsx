import React from "react";
// import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { compose, withStateHandlers, withProps } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import markerGray from "assets/img/markers/playground_gray.png";
import markerGreen from "assets/img/markers/playground_green.png";
// import markerPink from "assets/img/markers/playground_pink.png";
import { connect } from 'react-redux'
import { fetchPlaygrounds } from "../../../GlobalActions";
import { createLoadingSelector, createErrorMessageSelector } from "../../../api/Selectors";

const MAP_API_KEY = "AIzaSyCsy6bZ_CvGdeFBOTSDkN0gPqVK9iKDfQ8";

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
        if(data.error) {
            return {
                hasErrors: true,
                error: data.error.toString()
            };
        }
        return {
            playgrounds: data.playgrounds.map(playground => {
                return {
                    id: playground.id,
                    name: playground.name,
                    lat: playground.lat,
                    lng: playground.lng,
                    vol: playground.volunteerCount,
                    votes: playground.votes,
                    slug: playground.name + " Rookvrij",
                    zoom: 18,
                    default: false,
                };
            })
        };
    }
});

const PlaygroundMap = compose(
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
        { props.hasErrors === true &&
            <InfoBox
                defaultPosition={new window.google.maps.LatLng(props.center.lat, props.center.lng - 1)}
                options={{closeBoxURL: ``, enableEventPropagation: true}}
            >
                <div style={{backgroundColor: `white`, opacity: 0.75, padding: `12px`}}>
                    <div style={{fontSize: `16px`, fontColor: `darkred`}}>
                        {props.error}
                    </div>
                </div>
            </InfoBox>
        }

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
                {!props.playgroundsLoading &&
                props.playgrounds &&
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

const PlaygroundMapWithData = withPlaygrounds(PlaygroundMap);

export default withStyles(componentsStyle)(PlaygroundMapWithData);

//

class PlaygroundMap2 extends React.Component {

    componentDidMount() {
        this.props.fetchPlaygrounds()
      }

    render() {
        return (<PlaygroundMap {...this.props} />)
    }
}

const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector(['GET_PLAYGROUNDS']);
    const errorMessageSelector = createErrorMessageSelector(['GET_PLAYGROUNDS']);

    return {
        playgroundsLoading: loadingSelector(state),
        hasErrors: errorMessageSelector(state) !== '',
        error: errorMessageSelector(state),
        playgrounds: state.playgrounds.map(playground => {
            return {
                id: playground.id,
                name: playground.name,
                lat: playground.lat,
                lng: playground.lng,
                vol: playground.volunteerCount,
                votes: playground.votes,
                slug: playground.name + " Rookvrij",
                zoom: 18,
                default: false,
            };
        })
  }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaygrounds:    () =>     dispatch(fetchPlaygrounds()),
      }
}

export const PlaygroundMapII = connect(mapStateToProps, mapDispatchToProps)(PlaygroundMap2)



// const withPlaygrounds = graphql(GET_PLAYGROUNDS, {
//     // `ownProps` are the props passed into `MyComponentWithData`
//     // `data` is the result data (see above)
//     props: ({ownProps, data}) => {
//         if(data.loading) return {playgroundsLoading: true};
//         if(data.error) {
//             return {
//                 hasErrors: true,
//                 error: data.error.toString()
//             };
//         }
//         return {
//             playgrounds: data.playgrounds.map(playground => {
//                 return {
//                     id: playground.id,
//                     name: playground.name,
//                     lat: playground.lat,
//                     lng: playground.lng,
//                     vol: playground.volunteerCount,
//                     votes: playground.votes,
//                     slug: playground.name + " Rookvrij",
//                     zoom: 18,
//                     default: false,
//                 };
//             })
//         };
//     }
// });