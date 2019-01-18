import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import {withNamespaces} from "react-i18next";
import AddLocation from "@material-ui/icons/AddLocation";
import PlaygroundMap from "../../views/Onboarding/Sections/PlaygroundMap";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import { createInitiative } from '../Playground/PlaygroundActions';
import { connect } from 'react-redux'

const CREATE_INITIATIVE = gql`
    mutation CreateInitiative($input: CreateInitiativeInput!) {
        createInitiative(input: $input) {
            id
        }
    }
`;
class FormDialog extends React.Component {
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
            initiativeId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                // generate a uuid
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
                return v.toString(16);
            }),
            type: "smokefree",
            status: "not_started",
            open: false,
            duplicate: false,
            error: '',
        }
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    updateName = (eEvent) => {
        this.duplicateCheck(eEvent.target.value);
        this.setState({
            name: eEvent.target.value
        });

    };
    loadWorkspace = (eEvent) => {
        window.location.href = `/workspace/${this.state.initiativeId}`;
    };

    duplicateCheck = (playground) =>{
        const playgroundList = this.props.playgrounds;
        if (playgroundList.filter(e => e.name === playground).length > 0) {
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
        console.log(this.state);
    }

    handlePlaygroundChange(playground) {
        console.log("handlePlaygroundChange: ", playground);
        this.setState({
            playground: playground,
            map: {
                latlng: {lat: playground.lat, lng: playground.lng},
                zoom: 18
            }
        });
    }

    handleCreatePlayground = (e) => {
        console.log("handleCreatePlayground: ", e);
        this.setState({
            view: 'playground',
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };


    render() {

        const {classes} = this.props;
        const {map, error} = this.state;
        const playground = {
            name: this.state.name,
            lat: this.state.lat,
            lng: this.state.lng,
            initiativeId: this.state.initiativeId,
            type: "smokefree",
            status: "not_started"
        };

        return (
            <div className={"FormDialog-container"}>
                <Button
                    className={"btn btn-highlight map-add"}
                    onClick={this.handleClickOpen}
                >
                    <AddLocation/>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    className={"FormDialog"}
                >
                    <DialogTitle id="form-dialog-title">Voeg een speeltuin toe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Je staat op het punt om een speeltuin toe te voegen. We willen alleen nog van je weten wat de naam is van deze speeltuin.
                        </DialogContentText>
                        <PlaygroundMap
                            className={"playground-container"}
                            isMarkerShown
                            center={map.latlng}
                            zoom={map.zoom}
                            onPlaygroundChange={this.handlePlaygroundChange}
                            onPlaygroundCreated={this.handleCreatePlayground}

                        />
                        <form className={"form"}>
                            <TextField
                                className={classes.textField + " form-control"}
                                label="Wat is de naam van de speeltuin?"
                                pattern="/^\w{4,}$/"
                                onKeyUp={this.updateName}
                                defaultValue={this.state.name}/>
                        </form>
                        {error && <span className={"error alert"}>{error}</span>}
                    </DialogContent>
                    <DialogActions className={"dialog-actions"}>
                        <Button onClick={this.handleClose} color="primary">
                            Annuleren
                        </Button>

                        <Mutation
                            mutation={CREATE_INITIATIVE}
                            update={this.loadWorkspace}
                        >
                            {(joinInitiative) => (
                                <Button
                                    onClick={() => joinInitiative({variables: {input: playground}})}
                                    className={"btn btn-highlight" }
                                    disabled={this.state.duplicate}
                                >
                                    <span>Voeg een speeltuin toe</span>
                                </Button>
                            )}
                        </Mutation>

                        <Button
                                    // onClick={() => this.props.createInitiative((this.state.name, this.state.lat, this.state.lng))}
                                    onClick={() => this.props.createInitiative(playground.name, playground.lat, playground.lng)}
                                    className={"btn btn-highlight" }
                                    disabled={this.state.duplicate}
                                >
                                    <span>Voeg een speeltuin toe - redux</span>
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapStateToProps = state => {
    // const loadingSelector = createLoadingSelector([GET_PLAYGROUNDS]);
    // const errorMessageSelector = createErrorMessageSelector([GET_PLAYGROUNDS]);

}

const mapDispatchToProps = dispatch => {
    return {
        createInitiative:    (name, lat, lng) =>     dispatch(createInitiative(name, lat, lng)),
      }
}

const connectedFormDialog = connect(mapStateToProps, mapDispatchToProps)(FormDialog);




// const formDialog =  withStyles(componentsStyle)(
//     withNamespaces("translations")(FormDialog)
// );

export default withStyles(componentsStyle)(
    withNamespaces("translations")(connectedFormDialog)
);