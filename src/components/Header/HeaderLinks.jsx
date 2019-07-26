import React from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PermIdentity from "@material-ui/icons/PermIdentity";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Button, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer/Drawer";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import { signOutUser, deleteUser } from "../UserProfile/UserProfileActions";
import { getUser } from "../UserProfile/UserProfileReducer";
// import { isDeveloperMode } from "../../utils/DeveloperMode";
import { openConfirmationDialog } from "../SimpleDialog/SimpleDialogActions.js";
import Activities from "../Activities/Activities";
import { getRecordCountSinceExcludingActor } from "components/AuditTrail/AuditTrailReducer.js";
import { getLastAuditTrailView, getUserData } from "components/UserData/UserDataReducer.js";
import { storeUserData } from "components/UserData/UserDataActions.js";
import { isRecordIncluded } from "components/Activities/Activities.jsx";
import { TOTAL_RECORDS_TO_DISPLAY } from "components/Activities/Activities.jsx";

const StyledBadge = withStyles(theme => ({
    badge: {
        top: "20%",
        right: "20%",

        [theme.breakpoints.down("xs")]: {
            minWidth: 16,
            height: 16,
            fontSize: 8,
        },
    },
}))(Badge);

const mapStateToProps = state => {
    // var date = new Date();
    // date.setDate(date.getDate() - 10);

    return ({
        user: getUser(state),
        unreadNotificationCount: getRecordCountSinceExcludingActor(state, getLastAuditTrailView(state), getUser(state).name, TOTAL_RECORDS_TO_DISPLAY, isRecordIncluded),
        userData: getUserData(state)
    });
};

const mapDispatchToProps = dispatch => ({
    storeUserData: (userData) => dispatch(storeUserData(userData)),
    signOutUser: () => dispatch(signOutUser()),
    deleteUser: () => dispatch(
      openConfirmationDialog(
        "Bevestig uitschrijven",
        "Weet je zeker dat je je wilt uitschrijven?",
        null, null, () => dispatch(deleteUser())
      )
    )
});

class HeaderLinks extends React.Component {
    state = {
        notificationsOpen: false
    };

    gotoMyProfile = () => this.props.history.push('/mijn-profiel');

    toggleDrawer = () => {
      if (this.props.unreadNotificationCount > 0)
        this.props.storeUserData( {...this.props.userData, lastAuditTrailView: new Date()} )
      this.setState( ({ notificationsOpen }) => ({ notificationsOpen: !notificationsOpen } ) )
    }

    renderNotifications() {
        const { unreadNotificationCount, classes } = this.props;

        return (
          <StyledBadge color="secondary" badgeContent={unreadNotificationCount} onClick={this.toggleDrawer}>
              <IconButton size="small" color="primary" className={classes.navLink}>
                  <NotificationsNone className={classes.navIcon} />
              </IconButton>
          </StyledBadge>
        );
    }

    render() {
        const { classes, user, signOutUser } = this.props;
        const { notificationsOpen } = this.state;

        // const devModeIndicator = isDeveloperMode() ? 'on' : 'off';

        if (!user) return null;

        return (
              <div className={classes.list}>

                  {this.renderNotifications()}

                  <CustomDropdown
                    noLiPadding
                    buttonText=""
                    buttonProps={{
                        color: "transparent"
                    }}
                    buttonIcon={() => (
                      <IconButton color="primary" className={`${classes.navLink} ${classes.profileLink}`}>
                          <PermIdentity className={`${classes.navIcon} ${classes.profileIcon}`} />
                      </IconButton>
                    )}
                    dropdownList={[
                        <Typography className={classes.name}>Ingelogd als {user.name}</Typography>,
                        {divider: true},
                        <Button onClick={this.gotoMyProfile}>Mijn profiel</Button>,
                        <Button onClick={signOutUser}>Uitloggen</Button>,
                    ]}
                  />
                  {/*<Button onClick={this.gotoMyActies}>Mijn acties</Button>,*/}
                  {/*<Button onClick={() => setDeveloperMode(!isDeveloperMode())} >{'dev mode: ' + devModeIndicator}</Button>,*/}
                  {/*<Button onClick={deleteUser}>Uitschrijven</Button>,*/}

                  <Drawer
                    classes={{ paper: classes.notifications }}
                    anchor="right"
                    open={notificationsOpen}
                    onClose={this.toggleDrawer}
                  >
                      <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                      >
                          <Activities />
                      </div>
                  </Drawer>
              </div>
        );
    }
}

export default withRouter(withStyles(headerLinksStyle)(connect(mapStateToProps, mapDispatchToProps)(HeaderLinks)))
