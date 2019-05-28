import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import workspaceWelcomeStyle from "./WorkspaceWelcomeStyle.jsx";

import { connect } from 'react-redux'
import { claimManagerRole, ensurePlaygroundDetails, findPlaygroundsByName, stopPlaygroundDetailsStream }
    from "../../../../components/Playground/PlaygroundActions";
import { Redirect } from 'react-router-dom'

import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import { getAllPlaygrounds, getPlaygroundDetails } from "../../../../components/Playground/PlaygroundReducer";
import { getUser } from "../../../../components/UserProfile/UserProfileReducer";
import { getActivePhaseUrl } from "../../../../misc/WorkspaceHelpers";
import WorkspaceWelcomeContent from "./WorkspaceWelcomeContent";

const mapStateToProps = (state, ownProps) => ({
    playground: getPlaygroundDetails(state, ownProps.match.params.initiativeName),
    playgrounds: getAllPlaygrounds(state),

    user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
    claimManagerRole:    (initiativeId) =>     dispatch(claimManagerRole(initiativeId)),
    ensurePlaygroundDetails:    (initiativeId) =>     dispatch(ensurePlaygroundDetails(initiativeId)),
    stopPlaygroundDetailsStream:    (initiativeId) =>     dispatch(stopPlaygroundDetailsStream(initiativeId)),
})

class WorkspaceWelcome extends React.Component {
    componentDidMount() {
        const { ensurePlaygroundDetails, match: { params: { initiativeName } }, playgrounds } = this.props;

        const initiative = findPlaygroundsByName({ playgrounds, initiativeName });

        if (initiative && initiative.id) {
            console.log("starting stream playground details of " + initiativeName, initiative.id);
            ensurePlaygroundDetails(initiative.id);
        }
    }

    componentWillUnmount() {
        const { stopPlaygroundDetailsStream, match: { params: { initiativeName } }, playgrounds } = this.props;

        const initiative = findPlaygroundsByName({ playgrounds, initiativeName });

        if (initiative && initiative.id) {
            console.log('stopping stream: ', initiativeName, initiative.id);
            stopPlaygroundDetailsStream(initiative.id);
        }
    }

    render() {
        const { playground, user, classes, ...rest } = this.props;

        const userIsVolunteer = user && playground.volunteers.filter(volunteer => volunteer.userId === user.id).length > 0
        if (userIsVolunteer)
            return (<Redirect to={getActivePhaseUrl(playground)}></Redirect>)

        const isManager = user && playground.managers && !!playground.managers.filter(manager => {
            return manager.id === user.id
        }).length

        console.log(`Displaying workspace welcome for playground ${playground.id} and ${isManager ? 'manager' : 'user'} ${user ? user.id : 'anonymous'}`);

        return (
            <div className={"workspace-wrapper"}>
                <Header
                    playground={playground}
                    rightLinks={<HeaderLinks />}
                    showStats
                    fixed
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

                        <WorkspaceWelcomeContent
                            playground={playground}
                        />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}


export default withStyles(workspaceWelcomeStyle)(connect(mapStateToProps, mapDispatchToProps)(WorkspaceWelcome));
