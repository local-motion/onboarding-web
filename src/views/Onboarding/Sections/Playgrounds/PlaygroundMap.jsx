import React from "react";
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { compose, withStateHandlers, withProps, withHandlers } from "recompose";
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow, KmlLayer } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { withRouter } from "react-router-dom";

import markerRed from "../../../../assets/img/markers/playground-red.png";
import markerGreen from "../../../../assets/img/markers/playground-green.png";
import markerWhite from "../../../../assets/img/markers/playground-white.png";
import markerBlue from "../../../../assets/img/markers/playground-blue.png";
import { ensurePlaygrounds, slugifyPlaygroundName } from "../../../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../../../components/Playground/PlaygroundReducer";
import { getGoogleMapsKey } from "../../../../misc/ConfigReducer";
import CreatePlaygroundBubble from "./CreatePlaygroundBubble";
import OpenPlaygroundBubble from "./OpenPlaygroundBubble";


class PlaygroundMap extends React.Component {
    gotoPlayground = playground => this.props.history.push(`/actie/${slugifyPlaygroundName(playground)}`);

    onCreateSubmit = () => this.props.onCreateSubmit();

    render() {
        return (
          <PlaygroundMapImpl
            gotoPlayground={this.gotoPlayground}
            {...this.props}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.googleMapsKey}&v=3.exp&libraries=geometry,drawing,places`}
          />
        );
    }
}

const PlaygroundMapImpl = compose(
  withProps({
      loadingElement: <div style={{height: `100%`}}/>,
      containerElement: <div style={{height: `100%`}}/>,
      mapElement: <div style={{height: `100%`}}/>,
  }),
  withStateHandlers(
    () => ({
        isMarkerShown: false,
        newPin: null,
        isInfoShow: false,
        openedPlaygroundPopup: '',
        isCreateWindowOpen: true,
        isExistentPlaygroundWindowOpen: true,
        shouldOutline: true,
    }),
    {
        onMapClick: () => (e) => ({
            newPin: e.latLng,
            isMarkerShown: true
        }),
        onMarkerClustererClick: () => markerClusterer => {
            const clickedMarkers = markerClusterer.getMarkers();
            console.log(`Current clicked markers length: ${clickedMarkers.length}`);
            console.log(clickedMarkers);
        },
        onZoomChange: () => (value) => ({
            shouldOutline: value <= 8,
        }),
        openPlaygroundPopup: () => (id) => ({ openedPlaygroundPopup: id }),
        closePlaygroundPopup: () => () => ({ openedPlaygroundPopup: null }),
        toggleCreateWindowOpen: ({ isCreateWindowOpen }) => () => ({ isCreateWindowOpen: !isCreateWindowOpen }),
    }
  ),
  withHandlers(() => {
      const refs = {
          map: undefined,
      };

      return {
          onMapMounted: () => ref => {
              refs.map = ref
          },
          onZoomChanged: ({ onZoomChange }) => () => {
              onZoomChange(refs.map.getZoom());
          },
      }
  }),
  window.google ? null : withScriptjs,
  withGoogleMap
)(props => {
    const playgrounds = props.playgroundsToRender || props.playgrounds;

    return (
      <GoogleMap
        zoom={props.zoom}
        center={props.center}
        ref={props.onMapMounted}
        onZoomChanged={props.onZoomChanged}
        onClick={function(e) {
            if(!props.viewOnly) {
                props.onPlaygroundCreated(e);
                props.onMapClick(e);
            }
        }}
        defaultOptions={{disableDefaultUI: true, styles: [
            { elementType: "labels", featureType: "poi", stylers: [{ visibility: "off" }] },
            { elementType: "labels", featureType: "road.highway", stylers: [{ visibility: "off" }] }
        ]}}
      >
          {props.shouldOutline && (
            <KmlLayer
              url="https://storage.googleapis.com/mapsgoogl/provincesnl.kml"
              options={{ preserveViewport: true, clickable: false }}
            />
          )}

          <MarkerClusterer
            onClick={props.onMarkerClustererClick.bind(this)}
            averageCenter
            enableRetinaIcons
            gridSize={60}
          >
              { playgrounds && playgrounds.map(playground => {
                  const isPopupVisible = props.openedPlaygroundPopup === playground.id;
                  const onMarkerClick = !props.showBubbles
                    ? props.onPlaygroundChange.bind(this, playground)
                    : isPopupVisible
                        ? props.closePlaygroundPopup.bind(this)
                        : props.openPlaygroundPopup.bind(this, playground.id);

                  return (
                    <Marker
                      onClick={onMarkerClick}
                      key={playground.id}
                      position={{lat: playground.lat, lng: playground.lng}}
                      icon={playground.status === "NOT_STARTED" ? markerWhite : (playground.status === "IN_PROGRESS" ? markerBlue : markerGreen)}
                    >
                        {props.showBubbles && isPopupVisible &&  (
                          <InfoWindow onCloseClick={props.closePlaygroundPopup}>
                              <OpenPlaygroundBubble
                                gotoPlayground={() => props.gotoPlayground(playground)}
                                name={playground.name}
                              />
                          </InfoWindow>
                        )}
                    </Marker>
                  );
              })}


              {props.isMarkerShown &&
              <Marker
                position={props.newPin}
                icon={markerRed}
                options={{ optimized: false }}
                onClick={props.toggleCreateWindowOpen}
              >
                  {props.isCreateWindowOpen && (
                    <InfoWindow
                      onCloseClick={props.toggleCreateWindowOpen}
                    ><CreatePlaygroundBubble
                      onSubmit={props.onCreateSubmit}
                      position={props.newPin}
                      name={props.newName}
                      onNewNameChange={props.onNewNameChange}
                      error={props.error}
                    /></InfoWindow>
                  )}
              </Marker>
              }
          </MarkerClusterer>
      </GoogleMap>
    )
})

const mapStateToProps = state => ({
    playgrounds: getAllPlaygrounds(state),
    googleMapsKey: getGoogleMapsKey(state),
})

const mapDispatchToProps = dispatch => {
    return {
        ensurePlaygrounds:    () =>     dispatch(ensurePlaygrounds()),
      }
}

export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(withRouter(PlaygroundMap)));
