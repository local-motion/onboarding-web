import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from "@material-ui/core/styles/withStyles";
import {withTranslation} from "react-i18next";

import PlaygroundMap from "./PlaygroundMap";
import { createInitiative, CREATE_INITIATIVE } from '../../../../components/Playground/PlaygroundActions';
import { createLoadingSelector } from '../../../../api/Selectors';
import { getAllPlaygrounds } from "../../../../components/Playground/PlaygroundReducer";
import { getUser } from "../../../../components/UserProfile/UserProfileReducer";
import GooglePlacesAutocomplete from "../../components/GooglePlacesAutocomplete";

const styles = theme => ({
    autocomplete: {
        position: 'absolute',
        zIndex: 9999,
        background: '#FFF',
        borderRadius: 10,
        top: 30,
        left: 30,
    },
    dialog: {

    },
    content: {
        padding: '0 !important',
        height: '75vh',
    },
    playground: {
        height: '75vh',
    }
});


class AddPlayground extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            lat: "",
            lng: "",
            map: {
                latlng: {lat: 52.092876, lng: 5.10448},
                zoom: 8
            },
            open: false,
            duplicate: false,
            error: '',
        };
    };

    componentDidMount() {
        this.setDefaultMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
          (!prevProps.userAddress && this.props.userAddress)
            || (prevProps.userAddress && (prevProps.userAddress.lat !== this.props.userAddress.lat))
            || (prevProps.userAddress && (prevProps.userAddress.lng !== this.props.userAddress.lng))
        ) {
            this.setDefaultMap();
        }
    }

    setDefaultMap = () => {
        const { userAddress } = this.props;
        const map = userAddress
          ? {
              latlng: {lat: userAddress.lat, lng: userAddress.lng},
              zoom: userAddress.zoom
          } : {
              latlng: {lat: 52.092876, lng: 5.10448},
              zoom: 8
          };

        this.setState({ map });
    };

    isValidState = () => {
        return !this.state.duplicate && !this.state.error && !this.props.loading && this.state.name && this.state.lat && this.state.lng
    };

    submit = () => {
        if (!this.validateName(this.state.name) && this.isValidState)
            this.createInitiativeHandler();
    };

    createInitiativeHandler = () => {
        const { user, history, createInitiative } = this.props;
        const { name: enteredName, lat, lng } = this.state;

        const name = enteredName.trim();

        if (!user) return this.saveInitiativeAndGotoLogin({ name, lat, lng });

        createInitiative(name, lat, lng, (data) => history.push('/workspace/' + data.createInitiative.id))
    };

    saveInitiativeAndGotoLogin = ({ name, lat, lng }) => {
        localStorage.setItem('playgroundToCreate', JSON.stringify({ name, lat, lng }));

        this.props.history.push('/workspace/login?target=/workspace/');
    };

    handleClickOpen = () => {
        this.setState({open: true, name: '', duplicate: false, error: '', lat: '', lng: ''});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    updateName = (eEvent) => {
        const name = eEvent.target.value.replace('.', '').replace('  ', ' ');

        this.setState({ name });
        this.validateName(name, 'entry')
    };

    validateName = (name, stage) => {
        const validations = [
            {
                validateThat: name => name.length > 2,
                message: 'De naam van de speeltuin moet tenminste drie karakters lang zijn.',
                stages: ['submit']
            },
            {
                validateThat: name => name.length <= 40,
                message: 'De naam van de speeltuin mag maximaal 40 karakters lang zijn.'
            },
            {
                validateThat: name => this.props.playgrounds.filter(e => e.name.toLowerCase().trim() === name.toLowerCase()).length === 0,
                message: 'Er bestaat al een speeltuin met deze naam.'
            },
        ];

        let errorMessage = '';

        for (let i = 0; !errorMessage && i < validations.length; i++) {
            const validation = validations[i];

            if (!validation.stages || !stage || validation.stages.includes(stage))
            if (!validation.validateThat(name))
                errorMessage = validation.message
        }

        this.setState({
            error: errorMessage
        });

        return errorMessage;
    };

    duplicateCheck = (playgroundName) =>{
        const playgroundList = this.props.playgrounds;
        if (playgroundList.filter(e => e.name.toLowerCase().trim() === playgroundName.toLowerCase().trim()).length > 0) {
            this.setState({
                duplicate: true,
                error: 'Er bestaat al een speeltuin met deze naam.'
            });
        } else{
            this.setState({
                duplicate: false,
                error: ''
            });
        }
    };

    handlePlaygroundChange(playground) {
        // Do nothing as we do not allow to select a playground in this view
    }

    handleCreatePlayground = (e) => {
        this.setState({
            view: 'playground',
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };

    render() {
        const {
            classes,
            toggleOpen,
            isOpen,
            playgrounds,
            playgroundsToShow,
            googleMapsKey,
            GAHandleSelect,
            GAHandleChange,
            GAAddressInput,
        } = this.props;
        const {map} = this.state;
        const error = this.state.error;
        const isFromWorkspace = isOpen !== undefined;

        return (
            <div className={"FormDialog-container"}>
                <Dialog
                    fullScreen
                    open={isFromWorkspace ? isOpen : this.state.open}
                    onClose={toggleOpen || this.handleClose}
                    aria-labelledby="form-dialog-title"
                    className={classes.dialog}
                >
                    <DialogContent className={classes.content}>
                        <div className={classes.autocomplete}>
                            <GooglePlacesAutocomplete
                              googleMapsKey={googleMapsKey}
                              handleSelect={GAHandleSelect}
                              handleChange={GAHandleChange}
                              addressInput={GAAddressInput}
                            />
                        </div>

                        <PlaygroundMap
                            className={classes.playground}
                            isMarkerShown
                            center={map.latlng}
                            zoom={map.zoom}
                            onPlaygroundChange={this.handlePlaygroundChange}
                            onPlaygroundCreated={this.handleCreatePlayground}
                            playgrounds={playgroundsToShow || playgrounds}
                            onCreateSubmit={this.submit}
                            error={error}
                            newName={this.state.name}
                            onNewNameChange={this.updateName}
                            showBubbles
                        />
                    </DialogContent>
                    <DialogActions className={"dialog-actions"}>
                        <Button onClick={toggleOpen || this.handleClose} color="primary">
                            Annuleren
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector([CREATE_INITIATIVE]);
    return {
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
          })
        ),
        loading: loadingSelector(state),
        user: getUser(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createInitiative:    (name, lat, lng, onSuccessCallback) =>     dispatch(createInitiative(name, lat, lng, onSuccessCallback)),
      }
}

const connectedAddPlayground = connect(mapStateToProps, mapDispatchToProps)(AddPlayground);

export default withStyles(styles)(withTranslation("translations")(withRouter(connectedAddPlayground)));