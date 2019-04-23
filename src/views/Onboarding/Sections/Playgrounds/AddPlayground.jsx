import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import AddLocation from "@material-ui/icons/AddLocation";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import {withTranslation} from "react-i18next";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import PlaygroundMap from "./PlaygroundMap";
import { createInitiative, CREATE_INITIATIVE } from '../../../../components/Playground/PlaygroundActions';
import { createLoadingSelector } from '../../../../api/Selectors';
import { getAllPlaygrounds } from "../../../../components/Playground/PlaygroundReducer";
import { getUser } from "../../../../components/UserProfile/UserProfileReducer";

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
        }
        this.submit.bind(this)
    };

    isValidState = () => {
        return !this.state.duplicate && !this.state.error && !this.props.loading && this.state.name && this.state.lat && this.state.lng
    }

    submit = () => {
        const { user, history, createInitiative } = this.props;

        if (!user) return history.push('/login');

        if (!this.validateName(this.state.name) && this.isValidState)
            createInitiative(this.state.name, this.state.lat, this.state.lng, (data) => history.push('/workspace/' + data.createInitiative.id))
    }

    handleClickOpen = () => {
        this.setState({open: true, name: '', duplicate: false, error: '', lat: '', lng: ''});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    updateName = (eEvent) => {
        if (eEvent.key === 'Enter')
            this.submit()
        else {
            const name = eEvent.target.value.trim()
            this.setState({ name })
            this.validateName(name, 'entry')
        }
    }

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
        ]

        let errorMessage = ''

        for (let i = 0; !errorMessage && i < validations.length; i++) {
            const validation = validations[i]
            if (!validation.stages || !stage || validation.stages.includes(stage))
            if (!validation.validateThat(name))
                errorMessage = validation.message
        }

        this.setState({
            error: errorMessage
        })

        return errorMessage
    }

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
    }

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
        const {classes, toggleOpen, isOpen} = this.props;
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
                    className={"FormDialog"}
                >
                    <DialogTitle id="form-dialog-title">Voeg een speeltuin toe</DialogTitle>
                    <DialogContent>

                        <TextField
                            className={classes.textField + " form-control"}
                            label="Wat is de naam van de speeltuin?"
                            pattern="/^\w{4,}$/"
                            onKeyUp={this.updateName}
                            defaultValue={this.state.name}/>
                        {error && <span className={"error alert"}>{error}</span>}

                        <DialogContentText>
                            <span className={"add-playground-pin-title"}>Geef op de kaart de locatie van de speeltuin aan:</span>
                        </DialogContentText>

                        <PlaygroundMap
                            className={"playground-container"}
                            isMarkerShown
                            center={map.latlng}
                            zoom={map.zoom}
                            onPlaygroundChange={this.handlePlaygroundChange}
                            onPlaygroundCreated={this.handleCreatePlayground}

                        />
                    </DialogContent>
                    <DialogActions className={"dialog-actions"}>
                        <Button onClick={toggleOpen || this.handleClose} color="primary">
                            Annuleren
                        </Button>

                        <Button
                                onClick={() => this.submit()}
                                className={"btn btn-highlight" }
                                disabled={!this.isValidState()}
                            >
                                    <span>Voeg een speeltuin toe</span>
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

export default withStyles(componentsStyle)(withTranslation("translations")(withRouter(connectedAddPlayground)));