import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";

import OnboardingHeader from "./OnboardingHeader";
import { getUser } from "../../../components/UserProfile/UserProfileReducer";
import { container } from "../../../assets/jss/material-kit-react.jsx";

const ArrowIcon = () => (
  <SvgIcon width="18px" height="14px" viewBox="0 0 18 14">
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

const styles = theme => ({
    ...container,
    startscreen: {
        background: `url(${require('../../../assets/img/landing/firstscreen-bg.jpg')}) no-repeat bottom`,
        width: '100%',
        maxHeight: 770,
        height: '100%',
        padding: 20,
    },
    banner: {
        maxWidth: 1300,
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: '100px auto 240px',
        paddingLeft: 25,
    },
    bannerTitle: {
        fontSize: 74,
        fontFamily: "'dk_black_bamboo-webfont'",
        color: '#FFF',
        lineHeight: 1.2,
        textShadow: '0px 5px 10px rgba(40, 40, 40, 0.1)',
    },
    bannerButton: {
        backgroundColor: '#FFF',
        borderRadius: 31,
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        color: 'rgb(8, 92, 166)',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 1.2,
        marginTop: 45,
        maxHeight: 62,
        maxWidth: 280,
        padding: '20px 45px',
        textTransform: 'none',
        transition: 'all .2s',
        '& > span': {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        },
        '& svg': {
            fill: 'rgb(8, 92, 166)',
            marginLeft: 10,
        },
        '&:hover': {
            color: 'rgb(37, 142, 204)',
            backgroundColor: 'rgb(234, 236, 246)',
        },
        '&:hover svg': {
            fill: 'rgb(37, 142, 204)',
            marginLeft: 22,
        },
        '&:hover $buttonTitle': {
            marginLeft: 12,
        },
    },
    buttonTitle: {}
});

const mapStateToProps = state => ({
    user: getUser(state),
});


class Startscreen extends Component {
    render() {
        const { classes, user } = this.props;
        return (
          <div className={classes.startscreen}>
              <OnboardingHeader user={user} />

              <div className={`${classes.banner} ${classes.container}`}>
                  <span className={classes.bannerTitle}>Maak een speeltuin bij jou<br />in de buurt rookvruij</span>

                  <Button className={classes.bannerButton}>
                      <span className={classes.buttonTitle}>Start een actie</span>
                      <ArrowIcon />
                  </Button>
              </div>
          </div>
        );
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Startscreen));