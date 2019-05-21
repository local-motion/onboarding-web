import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import Button from "@material-ui/core/Button/Button";
import PinDrop from "@material-ui/icons/PinDrop";
import List from "@material-ui/icons/List";
import MyLocation from "@material-ui/icons/MyLocation";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import AddPlayground from "../../Onboarding/Sections/Playgrounds/AddPlayground";
import { getAllPlaygrounds } from "../../../components/Playground/PlaygroundReducer";
import { getGoogleMapsKey } from "../../../misc/ConfigReducer";
import PlaygroundMap from "../../Onboarding/Sections/Playgrounds/PlaygroundMap";
import GooglePlacesAutocomplete from "../../Onboarding/components/GooglePlacesAutocomplete";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import MiniMap from "../components/MiniMap";
import { slugifyPlaygroundName } from "../../../components/Playground/PlaygroundActions";

const styles = theme => ({
    wrapper: {},
    search: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 30px 15px',
        margin: '0 -30px',
        borderBottom: '1px solid rgb(231, 231, 231)',
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
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
    results: {
        width: '100%',
        minHeight: 200,
    },
    result: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 5,
        border: '1px solid #c5e3f5',
        marginTop: 5,

        '&:nth-child(even)': {
            background: '#f6fafd',
        },
    },
    miniMap: {
        display: 'flex',
        justifyContent: 'center',
        width: 60,
        paddingRight: 10,
    },
    miniMapContent: {
        height: 400,
        width: 600,
        padding: '0 !important',
    },
    miniMapButton: {
        minWidth: 36,
    },
    resultProperty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 200,
    },
    resultsHeading: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    switchers: {
        display: 'flex',
        justifyContent: 'center',
    },
    switcher: {
        margin: 0,
        color: '#626262',
        borderRadius: 0,
        textTransform: 'none',

        '&:hover': {
            color: '#085ca6',
        },
    },
    switcherActive: {
        color: '#085ca6',
        background: 'rgba(0, 0, 0, 0.08)',
    },
    switcherIcon: {
        marginRight: theme.spacing.unit,
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
    buttonInsideMap: {
        position: 'absolute',
        bottom: 140,
    },
    playgroundMap: {
        height: 550,
        margin: '0 -30px',
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
        addressInput: '',
        view: 'list',
        playground: {
            default: true,
            name: this.props.t("playground.default.area")
        },
        map: {
            latlng: { lat: 52.092876, lng: 5.10448 },
            zoom: 8
        },
        miniMapOpen: false,
        playgroundMiniMap: null,
    };

    handleChange = address => {
        this.setState({ addressInput: address.replace(', Netherlands', '') });
    };

    handleSelect = address => {
        geocodeByAddress(address)
          .then(results => {
              this.handleChange(address);

              return getLatLng(results[0]);
          })
          .then(latLng => this.getResults(latLng))
          .catch(error => console.error('Error', error));
    };

    toggleAddPlayground() {
        this.setState(({ isAddPlaygroundOpen }) => ({ isAddPlaygroundOpen: !isAddPlaygroundOpen }));
    }

    getResults({ lat: userLat, lng: userLng }) {
        this.setState({
            userAddress: {
                lat: userLat,
                lng: userLng,
                zoom: 12,
            },
            map: {
                latlng: { lat: userLat, lng: userLng },
                zoom: 11,
            }
        });

        const howManyResults = 3;

        const results = this.props.playgrounds.map((playground) => {
            const { lat, lng } = playground;

            return {
                ...playground,
                distance: getDistanceFromLatLonInM(lat, lng, userLat, userLng),
            };
        })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, howManyResults);

        this.setState({ results });
    }

    renderList() {
        const { classes } = this.props;
        const { results, miniMapOpen, playgroundMiniMap } = this.state;

        return (
          <React.Fragment>
              {
                  results.map((playground) => {
                      const { name, distance = 0, volunteerCount } = playground;

                      const convertedDistance = distance >= 1000
                        ? `< ${Math.round(distance / 1000)} km`
                        : `< ${Math.round(distance)} m`;

                      return (
                        <div key={name} className={classes.result}>
                            <div className={classes.miniMap}>
                                <Button className={classes.miniMapButton} onClick={this.handleOpenMiniMap.bind(null, playground)}>
                                    <MyLocation />
                                </Button>
                            </div>

                            <div className={classes.resultProperty}>
                                <div className={classes.resultTitle}>Naam</div>
                                <div className={classes.resultSubtitle}>{name}</div>
                            </div>

                            <div className={classes.resultProperty}>
                                <div className={classes.resultTitle}>Afstand</div>
                                <div className={classes.resultSubtitle}>{convertedDistance}</div>
                            </div>

                            <div className={classes.resultProperty}>
                                <div className={classes.resultTitle}>Deelnemers</div>
                                <div className={classes.resultSubtitle}>{volunteerCount}</div>
                            </div>

                            <Button
                              className={classes.resultButton}
                              color="primary"
                              component={Link}
                              to={`/actie/${slugifyPlaygroundName(playground)}`}
                              variant="contained"
                            >Sluit je aan</Button>
                        </div>
                      );
                  })
              }

              <Dialog maxWidth="sm" open={miniMapOpen} onClose={this.handleCloseMiniMap}>
                  <DialogContent className={classes.miniMapContent}>
                      <MiniMap playground={playgroundMiniMap} />
                  </DialogContent>
              </Dialog>
          </React.Fragment>
        );
    }

    handleOpenMiniMap = (playground) => {
        this.setState({ miniMapOpen: true, playgroundMiniMap: playground });
    };

    handleCloseMiniMap = () => {
        this.setState({ miniMapOpen: false, playgroundMiniMap: null });
    };

    handlePlaygroundChange = (playground) => {
        const isPlayground = playground.id;

        const newState = {
            ...this.state,
            playground: isPlayground
              ? playground
              : {
                  default: true,
                  name: this.props.t("playground.default.area")
              },
        };

        if (playground.lat && playground.lng) {
            newState.map = {
                latlng: {lat: playground.lat, lng: playground.lng},
                zoom: playground.zoom || 10
            };
        }

        this.setState(newState);
    };

    renderMap() {
        const { classes } = this.props;
        const { map, results } = this.state;

        return (
          <div className={classes.playgroundMap}>
              <PlaygroundMap
                viewOnly
                onPlaygroundChange={this.handlePlaygroundChange}
                center={map.latlng}
                zoom={map.zoom}
                playgroundsToRender={results}
                showBubbles
              />
          </div>
        );
    }

    switchViewToList = () => this.setState({ view: 'list' });
    switchViewToMap = () => this.setState({ view: 'map' });

    renderResults() {
        const { classes } = this.props;
        const { view, results } = this.state;

        const isMap = view === 'map';

        if (!results) return;

        return (
          <React.Fragment>
              {results.length === 0
                ? <div>Er zijn geen resultaten.</div>
                : isMap
                    ? this.renderMap()
                    : this.renderList()
              }

              <Button
                className={`${classes.addPlaygroundButton} ${isMap ? classes.buttonInsideMap : ''}`}
                onClick={this.toggleAddPlayground}
              >
                  Mijn speeltuin staat er nog niet bij
                  <ArrowIcon />
              </Button>
          </React.Fragment>
        );
    }

    render() {
        const { classes, googleMapsKey } = this.props;
        const { isAddPlaygroundOpen, userAddress, addressInput, results, view } = this.state;

        const isList = view === 'list';
        const isMap = view === 'map';

        return (
          <div>
              <WorkspaceCard
                title={"Actie starten"}
                done={null}
                image={require("../../../assets/img/backgrounds/workspace-welcome.jpg")}
                content={"De eerste stap is om te kijken of je je kunt aansluiten bij een bestaande actiepagina van jouw speeltuin. Misschien is een team bezig om jouw speeltuin rookvrij te maken. Vul je plaatsnaam, adres of postcode in om te beginnen."}
                expandContent={
                    <div className={classes.wrapper}>
                        <div className={classes.search}>
                            <GooglePlacesAutocomplete
                              googleMapsKey={googleMapsKey}
                              handleSelect={this.handleSelect}
                              handleChange={this.handleChange}
                              addressInput={addressInput}
                            />

                            {results && (
                              <div className={classes.switchers}>
                                  <Button
                                    onClick={this.switchViewToList}
                                    size="medium"
                                    className={`${classes.switcher} ${isList ? classes.switcherActive : ''}`}
                                  >
                                      <List className={classes.switcherIcon} />
                                      Lijst
                                  </Button>
                                  <Button
                                    onClick={this.switchViewToMap}
                                    size="medium"
                                    className={`${classes.switcher} ${isMap ? classes.switcherActive : ''}`}
                                  >
                                      <PinDrop className={classes.switcherIcon} />
                                      Kaart
                                  </Button>
                              </div>
                            )}
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
                playgroundsToShow={results}
                googleMapsKey={googleMapsKey}
                GAHandleSelect={this.handleSelect}
                GAHandleChange={this.handleChange}
                GAAddressInput={addressInput}
              />
          </div>
        );
    }
}

export default withTranslation("translations")(withRouter(withStyles(styles)(
  connect(mapStateToProps)(AddFindPlayground)
)));