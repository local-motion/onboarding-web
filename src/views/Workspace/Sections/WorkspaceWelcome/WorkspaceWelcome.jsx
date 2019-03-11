import React from "react";
//import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import workspaceWelcomeStyle from "./WorkspaceWelcomeStyle.jsx";

import { connect } from 'react-redux'
import { claimManagerRole, GET_PLAYGROUND_DETAILS, ensurePlaygroundDetails, joinInitiative } from "../../../../components/Playground/PlaygroundActions";
import { Redirect } from 'react-router-dom'

import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import PlaygroundIcons from "components/PlaygroundIcons/PlaygroundIcons";
import { getPlaygroundDetails } from "../../../../components/Playground/PlaygroundReducer";
import { isLoading, getFetchError } from "../../../../api/FetchDetailsReducer";
import { getUser } from "../../../../components/UserProfile/UserProfileReducer";
import { history } from "../../../../setup";

const mapStateToProps = (state, ownProps) => ({
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeId),
    playgroundLoading: isLoading(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),
    playgroundError: getFetchError(state, GET_PLAYGROUND_DETAILS, ownProps.match.params.initiativeId),

    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    claimManagerRole:    (initiativeId) =>     dispatch(claimManagerRole(initiativeId)),
    joinInitiative:    (initiativeId) =>     dispatch(joinInitiative(initiativeId)),
    ensurePlaygroundDetails:    (initiativeId) =>     dispatch(ensurePlaygroundDetails(initiativeId)),
    stopPlaygroundDetailsStream:    (initiativeId) =>     dispatch(stopPlaygroundDetailsStream(initiativeId)),
})

const playgroundStatuses = ['not_started', 'in_progress', 'finished']

class WorkspaceWelcome extends React.Component {

    onClickClaim() {
        this.props.claimManagerRole(this.props.playground.id)
    }

    componentDidMount() {
        console.log("ensuring playground details of " + this.props.match.params.initiativeId)
        this.props.ensurePlaygroundDetails(this.props.match.params.initiativeId)
    }

    componentWillUnmount() {
        console.log('stopping stream: ', this.props.match.params.initiativeId)
        this.props.stopPlaygroundDetailsStream(this.props.match.params.initiativeId)
    }
    
    goToLogin() {
        history.push('/login');
    }

    gotoActivePhase() {
        const result = playgroundStatuses.find(element => element === this.props.playground.status)
        const index = result ? playgroundStatuses.indexOf(result) : 0
        history.push('/workspace/' + this.props.match.params.initiativeId + '/phase/' + (index + 1))
    }

    getActivePhaseUrl() {
        const result = playgroundStatuses.find(element => element === this.props.playground.status)
        const index = result ? playgroundStatuses.indexOf(result) : 0
        return '/workspace/' + this.props.match.params.initiativeId + '/phase/' + (index + 1)
    }

    onJoinClicked = () => {
        this.props.joinInitiative(this.props.playground.id)
    }

    render() {
        const { playground, user, classes, ...rest } = this.props;

        if (!playground || this.props.playgroundLoading)
            return "loading.."

        const userIsVolunteer = user && playground.volunteers.filter(volunteer => volunteer.userId === user.id).length > 0
        if (userIsVolunteer)
            return (<Redirect to={this.getActivePhaseUrl()}></Redirect>)

        const isManager = user && playground.managers && !!playground.managers.filter(manager => {
            return manager.id === user.id
        }).length

        console.log(`Displaying workspace welcome for playground ${playground.id} and ${isManager ? 'manager' : 'user'} ${user ? user.id : 'anonymous'}`);

        return (
            <div className={"workspace-wrapper"}>
                <Header
                    brand={playground.name}
                    playground={playground}
                    rightLinks={<HeaderLinks />}
                    fixed
                    textBrand
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />

                <div className={classes.page}>
                    <div className={classes.container}>
                        <div className={classes.title}>{playground.name} Rookvrij</div>
                        <div className={classes.descr}>Via deze website kan je een speeltuin in 3 fases rookvrij maken.</div>
                        <div className={classes.icons}>
                            <PlaygroundIcons />
                        </div>
                        <div className={classes.buttonContainer}>
                            {user ?
                                <button
                                    className={classes.button}
                                    onClick={() => this.onJoinClicked()}>
                                    Ga direct aan de slag
                                </button>
                            :
                                <button
                                    className={classes.button}
                                    onClick={() => this.goToLogin()}>
                                    Ga direct aan de slag
                                </button>
                            }
                            <button className={classes.skip} onClick={() => this.gotoActivePhase()}>
                                Ga direct naar de pagina
                            </button>
                        </div>
                    </div>
                    <Footer onlyLogo />
                </div>
            </div>
        )
    }
}


export default withStyles(workspaceWelcomeStyle)(connect(mapStateToProps, mapDispatchToProps)(WorkspaceWelcome));
