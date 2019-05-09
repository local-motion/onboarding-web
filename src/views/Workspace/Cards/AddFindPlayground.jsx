import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Search from "@material-ui/icons/Search";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import AddPlayground from "../../Onboarding/Sections/Playgrounds/AddPlayground";
import { getAllPlaygrounds } from "../../../components/Playground/PlaygroundReducer";
import { getGoogleMapsKey } from "../../../misc/ConfigReducer";

const styles = theme => ({
    wrapper: {},
    search: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 30px 30px',
        margin: '0 -30px',
        borderBottom: '1px solid rgb(231, 231, 231)',
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        marginRight: 10,
        width: 400,
    },
    cssLabel: {
        transform: 'translate(12px, 14px) scale(1)',
        '&$cssFocused': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
    },
    cssFocused: {},
    gotoMapButton: {
        padding: '10px 17px',
        paddingRight: 40,

        '& svg': {
            position: 'absolute',
            right: 10,
            transition: 'all .3',
        },
        '&:hover svg': {
            right: 5,
        }
    },
    resultsTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: "'dk_black_bamboo-webfont'",
        color: '#085ca6',
        margin: '20px 0',
    },
    result: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 5,
        border: '1px solid #c5e3f5',
        marginBottom: 5,

        '&:nth-child(even)': {
            background: '#f6fafd',
        },
    },
    resultProperty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 200,
    },
    resultTitle: {
        color: '#085ca6',
        fontSize: 12,
        lineHeight: 1.2,
        fontWeight: 'bold',
    },
    resultSubtitle: {
        color: '#626262',
        lineHeight: 1.2,
        fontSize: 15,
        fontWeight: 'bold',
    },
    resultMap: {
        width: 60,
        height: 60,
    },
    resultButton: {
        boxShadow: 'none',
        fontSize: 13,

        '&:hover': {
            background: '#51a5d6',
            boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
            color: '#FFF',
        },
    },
    addPlaygroundButton: {
        background: '#eb621b',
        color: '#FFF',
        padding: '10px 47px 10px 20px',
        marginTop: 30,

        '&:hover': {
            color: '#FFF',
            borderColor: '#FFF',
            backgroundColor: 'rgba(235, 98, 27, .8)',
        },

        '& svg': {
            position: 'absolute',
            right: 15,
            top: 11,
        },
        '&:hover svg': {
            right: 10,
        }
    },
});

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c * 1000; // Distance in meters

    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const ArrowIcon = () => (
  <SvgIcon width="18px" height="14px" viewBox="0 0 24 17">
      <path fillRule="evenodd"
            d="M16.739,6.288 L10.661,0.288 C10.269,-0.100 9.636,-0.095 9.248,
            0.298 C8.860,0.691 8.864,1.324 9.258,1.712 L13.601,6.000 L1.963,
            6.000 C1.410,6.000 0.963,6.447 0.963,7.000 C0.963,7.553 1.410,
            8.000 1.963,8.000 L13.601,8.000 L9.258,12.288 C8.864,12.676 8.861,
            13.309 9.248,13.702 C9.444,13.900 9.702,14.000 9.960,14.000 C10.213,
            14.000 10.467,13.904 10.661,13.712 L16.739,7.712 C16.929,
            7.524 17.037,7.268 17.037,7.000 C17.037,6.732 16.930,6.477 16.739,
            6.288 Z"
      />
  </SvgIcon>
);

const mapStateToProps = state => ({
    playgrounds: getAllPlaygrounds(state),
    googleMapsKey: getGoogleMapsKey(state),
});


const PlacesWithStandaloneSearchBox = props => (
  <PlacesWithStandaloneSearchBoxImpl
    {...props}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.googleMapsKey}&v=3.exp&libraries=places`}
  />
);

const PlacesWithStandaloneSearchBoxImpl = compose(
  withProps({
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
      componentWillMount() {
          const refs = {};

          this.setState({
              places: [],
              onSearchBoxMounted: ref => {
                  refs.searchBox = ref;
              },
              onPlacesChanged: () => {
                  const places = refs.searchBox.getPlaces();

                  this.props.getResults(places[0]);

                  this.setState({
                      places,
                  });
              },
          })
      },
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox="" className={props.searchBar}>
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
      >
          <TextField
            type="text"
            variant="outlined"
            name="search"
            className={props.classes.textInput}
            label="Zoek in je plaats"
            autoFocus
            placeholder="e.g. 9402 AS"
            InputLabelProps={{
                classes: {
                    root: props.classes.cssLabel,
                    focused: props.classes.cssFocused,
                }
            }}
            InputProps={{
                endAdornment:
                  <InputAdornment disablePointerEvents position="end">
                      <Search color="disabled" />
                  </InputAdornment>,
            }}
            inputProps={{
                style: {
                    padding: '12px 14px'
                }
            }}
          />
      </StandaloneSearchBox>
  </div>
);


class AddFindPlayground extends Component {
    constructor(props) {
        super(props);

        this.toggleAddPlayground = this.toggleAddPlayground.bind(this);
        this.getResults = this.getResults.bind(this);
        this.renderResults = this.renderResults.bind(this);
    }

    state = {
        isAddPlaygroundOpen: false,
        userAddress: null,
        results: null,
    };

    toggleAddPlayground() {
        this.setState(({ isAddPlaygroundOpen }) => ({ isAddPlaygroundOpen: !isAddPlaygroundOpen }));
    }

    getResults({ geometry: { location } }) {
        const userLat = location.lat();
        const userLng = location.lng();

        this.setState({
            userAddress: {
                lat: userLat,
                lng: userLng,
                zoom: 15,
            },
        });

        const results = this.props.playgrounds.map((playground) => {
            const { lat, lng } = playground;

            return {
                ...playground,
                distance: getDistanceFromLatLonInM(lat, lng, userLat, userLng),
            };
        })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3);

        this.setState({ results });
    }

    renderResults() {
        const { classes } = this.props;
        const { results } = this.state;

        if (!results) return;

        if (results.length === 0) return <div>Er zijn geen resultaten.</div>;

        return (
          <div>
              <div className={classes.resultsTitle}>Zoekresulaten:</div>

              {
                  results.map(({ name, distance = 0, volunteerCount, id }) => {
                      const convertedDistance = distance >= 1000
                        ? `< ${Math.round(distance / 1000)} km`
                        : `< ${Math.round(distance)} m`;

                      return (
                        <div key={name} className={classes.result}>
                            <div className={classes.resultProperty}>
                                <div className={classes.resultTitle}>Naam</div>
                                <div className={classes.resultSubtitle}>{name}</div>
                            </div>

                            <div className={classes.resultProperty}>
                                <div className={classes.resultTitle}>Afstand</div>
                                <div className={classes.resultSubtitle}>{convertedDistance}</div>
                            </div>

                            <div className={classes.resultProperty}>
                                <div className={classes.resultTitle}>Deelneemers</div>
                                <div className={classes.resultSubtitle}>{volunteerCount}</div>
                            </div>

                            <Button
                              className={classes.resultButton}
                              color="primary"
                              component={Link}
                              to={`/workspace/${id}`}
                              variant="contained"
                            >Sluit je aan</Button>
                        </div>
                      );
                  })
              }

              <Button
                className={classes.addPlaygroundButton}
                onClick={this.toggleAddPlayground}
              >
                  Mijn speeltuin staat er nog niet bij
                  <ArrowIcon />
              </Button>
          </div>
        );
    }

    render() {
        const { classes, googleMapsKey } = this.props;
        const { isAddPlaygroundOpen, userAddress } = this.state;

        return (
          <div>
              <WorkspaceCard
                title={"Actie starten"}
                done={null}
                image={require("../../../assets/img/backgrounds/workspace-welcome.jpg")}
                content={"De eerste stap is om te kijken of je je kunt aansluiten bij een bestaande actiepagina van jouw speeltuin. Misschien is een team bezig om jou speeltuin rookvrij te maken. Vul je plaatsnaam, adres of postcode in om te beginnen."}
                expandContent={
                    <div className={classes.wrapper}>
                        <div className={classes.search}>
                            <PlacesWithStandaloneSearchBox
                              getResults={this.getResults}
                              classes={classes}
                              googleMapsKey={googleMapsKey}
                            />

                            <Button
                              className={classes.gotoMapButton}
                              onClick={this.toggleAddPlayground}
                            >
                                Of zoek op de kaart
                                <ArrowIcon />
                            </Button>
                        </div>

                        <div className={classes.results}>
                            {this.renderResults()}
                        </div>
                    </div>
                }
              />

              <AddPlayground
                isOpen={isAddPlaygroundOpen}
                toggleOpen={this.toggleAddPlayground}
                userAddress={userAddress}
              />
          </div>
        );
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(AddFindPlayground)));