import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Button from "@material-ui/core/Button/Button";
import { Helmet } from "react-helmet";

import { container } from "../../assets/jss/material-kit-react";
import { titlePrefix } from "../../misc/WorkspaceHelpers";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { deleteUser } from "../../components/UserProfile/UserProfileActions";
import { openConfirmationDialog } from "../../components/SimpleDialog/SimpleDialogActions";
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    container: {
        ...container,
        marginTop: 100,
    },
    paper: {
        alignItems: "center",
        borderRadius: "7px",
        border: "1px dashed #b1defe",
        boxShadow: "0px 5px 10px 0px rgba(40, 40, 40, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
    },
    avatarWrapper: {
        alignItems: "center",
        background: "#258ecc",
        borderRadius: "50%",
        boxShadow: "0px 5px 10px 0px rgba(40, 40, 40, 0.1)",
        display: "flex",
        height: 120,
        justifyContent: "center",
        width: 120,
        position: "absolute",
        left: "calc(50% - 60px)",
        top: -60
    },
    editWrapper: {
        alignItems: "center",
        background: "#FFF",
        border: "1px solid #b1defe",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        height: 37,
        justifyContent: "center",
        position: "absolute",
        right: 0,
        top: 0,
        width: 37,

        "&:hover": {
            fill: "#FFF",
            background: "#b1defe"
        }
    },
    editIcon: {
        fill: "#085ca6"
    },
    avatar: {
        fill: "#FFF",
        width: 43,
        height: 42
    },
    avatarText: {
        marginTop: 80,
        fontSize: 14,
        color: "#626262",
        fontWeight: 400,
    },
    input: {
        fontSize: 15,
        color: '#626262',
        fontWeight: 400,
        width: '100%',
        maxWidth: '60%',
        marginTop: 15,

        [theme.breakpoints.down('xs')]: {
            maxWidth: '90%',
        },
    },
    settingsTitle: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 26,
        fontFamily: 'dk_black_bamboo-webfont',
        marginBottom: 5,
        marginTop: 30,

        [theme.breakpoints.down('xs')]: {
            fontSize: 22,
            margin: '30px 5px 5px',
        },
    },
    settingsIcon: {
        height: 27,
        marginRight: 10,
        width: 33,
    },
    checkbox: {
        marginRight: 0,
        marginLeft: 0,
    },
    actions: {
        margin: '20px 0 40px',

        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            margin: '20px 0 20px',
        },
    },
    button: {
        padding: '15px 40px',
        color: '#FFF',
        boxShadow: 'none',

        [theme.breakpoints.down('xs')]: {
            margin: 5,
            width: 150,
            padding: '10px 30px',
        },
    },
    cancelButton: {
        marginRight: 15,
        background: '#626262',

        '&:hover': {
            background: '#a1a1a1',
            boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        },

        [theme.breakpoints.down('xs')]: {
            marginRight: 5,
        },
    },
    saveButton: {
        background: '#085ca6',

        '&:hover': {
            background: '#258ecc',
            boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        },
    },
    disabled: {
        color: '#FFF !important',
    },
});

const UserIcon = ({ className }) => (
  <SvgIcon className={className} width="43px" height="42px" viewBox="0 0 43 42">
      <path fillRule="evenodd"  fill="rgb(255, 255, 255)"
            d="M41.099,42.000 L2.099,42.000 C1.272,42.000 0.618,41.312 0.618,40.443 C0.618,32.260 6.957,25.634 14.709,25.634 L28.489,25.634 C36.276,25.634 42.580,32.296 42.580,40.443 C42.580,41.312 41.926,42.000 41.099,42.000 ZM28.489,28.748 L14.709,28.748 C9.058,28.748 4.407,33.201 3.684,38.886 L39.514,38.886 C38.791,33.165 34.140,28.748 28.489,28.748 ZM21.530,23.570 C15.329,23.570 10.299,18.248 10.299,11.767 C10.299,5.286 15.329,-0.000 21.530,-0.000 C27.731,-0.000 32.761,5.250 32.761,11.767 C32.761,18.284 27.731,23.570 21.530,23.570 ZM21.530,3.077 C16.982,3.077 13.261,6.988 13.261,11.767 C13.261,16.546 16.982,20.457 21.530,20.457 C26.078,20.457 29.799,16.546 29.799,11.767 C29.799,6.988 26.078,3.077 21.530,3.077 Z"/>
  </SvgIcon>
);

const NotificationIcon = ({ className }) => (
  <SvgIcon width="33px" height="27px" viewBox="0 0 33 27" className={className}>
      <path fillRule="evenodd" fill="rgb(98, 98, 98)"
            d="M31.005,18.482 C30.823,18.639 30.599,18.715 30.377,18.715 C30.105,18.715 29.835,18.601 29.645,18.380 C29.297,17.975 29.343,17.365 29.747,17.017 C30.564,16.314 31.046,15.156 31.037,13.920 C31.028,12.708 30.562,11.629 29.758,10.957 C29.349,10.615 29.294,10.006 29.635,9.597 C29.977,9.187 30.586,9.133 30.995,9.474 C32.234,10.511 32.953,12.126 32.966,13.906 C32.980,15.729 32.265,17.397 31.005,18.482 ZM27.512,17.017 C27.237,17.017 26.964,16.900 26.773,16.673 C26.430,16.265 26.483,15.655 26.891,15.312 C27.259,15.002 27.477,14.493 27.473,13.951 C27.469,13.425 27.261,12.955 26.902,12.663 C26.489,12.326 26.427,11.718 26.764,11.304 C27.100,10.891 27.708,10.828 28.121,11.166 C28.927,11.822 29.394,12.832 29.402,13.936 C29.411,15.064 28.948,16.104 28.133,16.791 C27.952,16.943 27.731,17.017 27.512,17.017 ZM23.996,23.708 L20.092,23.708 C19.681,25.309 18.227,26.497 16.500,26.497 C14.773,26.497 13.318,25.309 12.908,23.708 L9.003,23.708 C7.637,23.708 6.526,22.595 6.526,21.227 L6.526,21.142 C6.526,19.907 7.432,18.880 8.614,18.693 L8.614,11.517 C8.614,8.037 10.875,5.076 14.004,4.028 L14.004,3.002 C14.004,1.624 15.124,0.503 16.500,0.503 C17.876,0.503 18.996,1.624 18.996,3.002 L18.996,4.028 C22.125,5.076 24.386,8.037 24.386,11.517 L24.386,18.693 C25.568,18.880 26.474,19.907 26.474,21.142 L26.474,21.227 C26.474,22.595 25.363,23.708 23.996,23.708 ZM16.500,24.565 C17.125,24.565 17.676,24.240 17.994,23.751 L15.006,23.751 C15.323,24.240 15.874,24.565 16.500,24.565 ZM17.066,3.002 C17.066,2.689 16.812,2.435 16.500,2.435 C16.188,2.435 15.933,2.689 15.933,3.002 L15.933,3.623 L17.066,3.623 L17.066,3.002 ZM22.456,11.517 C22.456,8.229 19.784,5.554 16.500,5.554 C13.215,5.554 10.543,8.229 10.543,11.517 L10.543,18.662 L22.456,18.662 L22.456,11.517 ZM24.544,21.142 C24.544,20.839 24.298,20.593 23.996,20.593 L9.003,20.593 C8.701,20.593 8.456,20.839 8.456,21.142 L8.456,21.227 C8.456,21.530 8.701,21.776 9.003,21.776 L23.996,21.776 C24.298,21.776 24.544,21.530 24.544,21.227 L24.544,21.227 L24.544,21.142 ZM6.226,16.673 C6.036,16.900 5.763,17.017 5.487,17.017 C5.268,17.017 5.048,16.943 4.867,16.791 C4.052,16.104 3.589,15.064 3.597,13.936 C3.606,12.832 4.073,11.822 4.879,11.166 C5.292,10.828 5.900,10.891 6.236,11.304 C6.573,11.718 6.511,12.326 6.097,12.663 C5.739,12.955 5.531,13.425 5.527,13.951 C5.523,14.493 5.740,15.002 6.109,15.312 C6.517,15.655 6.569,16.264 6.226,16.673 ZM3.355,18.380 C3.164,18.601 2.894,18.715 2.623,18.715 C2.400,18.715 2.177,18.639 1.995,18.482 C0.735,17.397 0.020,15.729 0.034,13.906 C0.047,12.126 0.766,10.511 2.005,9.474 C2.414,9.133 3.023,9.187 3.364,9.597 C3.706,10.006 3.651,10.615 3.242,10.957 C2.438,11.629 1.972,12.708 1.963,13.920 C1.954,15.156 2.436,16.314 3.253,17.017 C3.657,17.365 3.703,17.975 3.355,18.380 Z"/>
  </SvgIcon>
);

const PasswordIcon = ({ className }) => (
  <SvgIcon width="20px" height="26px" viewBox="0 0 20 26" className={className}>
      <path fillRule="evenodd" fill="rgb(98, 98, 98)"
            d="M17.059,26.000 L2.941,26.000 C1.319,26.000 -0.000,24.633 -0.000,22.953 L-0.000,12.594 C-0.000,10.914 1.319,9.547 2.941,9.547 L4.704,9.547 L4.704,5.371 C4.704,2.409 7.079,-0.000 9.998,-0.000 C12.917,-0.000 15.292,2.409 15.292,5.371 L15.292,9.547 L17.059,9.547 C18.681,9.547 20.000,10.914 20.000,12.594 L20.000,22.953 C20.000,24.633 18.681,26.000 17.059,26.000 ZM13.331,5.371 C13.331,3.529 11.836,2.031 9.998,2.031 C8.160,2.031 6.665,3.529 6.665,5.371 L6.665,9.547 L13.331,9.547 L13.331,5.371 ZM18.039,12.594 C18.039,12.034 17.599,11.578 17.059,11.578 L2.941,11.578 C2.401,11.578 1.961,12.034 1.961,12.594 L1.961,22.953 C1.961,23.513 2.401,23.969 2.941,23.969 L17.059,23.969 C17.599,23.969 18.039,23.513 18.039,22.953 L18.039,12.594 ZM10.979,17.984 L10.979,20.211 C10.979,20.772 10.540,21.227 9.998,21.227 C9.457,21.227 9.018,20.772 9.018,20.211 L9.018,17.981 C8.518,17.647 8.186,17.065 8.186,16.402 C8.186,15.365 8.998,14.523 10.000,14.523 C11.002,14.523 11.814,15.365 11.814,16.402 C11.814,17.067 11.481,17.650 10.979,17.984 Z"/>
  </SvgIcon>
);


class MyProfile extends Component {
    state = {
        username: "",
        email: "",
        notifications: false,
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    };

    componentDidMount() {
        this.setDefaultUserInfo();
    }

    setDefaultUserInfo = () => {
        const { user } = this.props;

        if (user) {
            const { name, email } = user;

            this.setState({ username: name, email, notifications: false });
        }
    };

    saveUserInfo = () => {
        const { username, email, notifications } = this.state;

        console.log('Save username, email, notifications',
          username, email, notifications);
    };

    setDefaultPassword = () => this.setState({
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    });

    saveNewPassword = () => {
        const { oldPassword, newPassword, repeatNewPassword } = this.state;

        console.log('Save oldPassword, newPassword, repeatNewPassword',
          oldPassword, newPassword, repeatNewPassword);
    };

    onChange = ({ target }) => this.setState({
        [target.name]: target.value
    });

    toggleCheck = () => this.setState(
      ({ notifications }) => ({ notifications: !notifications })
    );

    removeProfile = () => {
        this.props.deleteUser();
    };

    isUserInfoButtonDisabled = () => {
        const { user } = this.props;
        const { username, email } = this.state;

        // need notifications
        return !!(user.name === username && user.email === email);
    };

    isNewPasswordButtonDisabled = () => {
        const { oldPassword, newPassword, repeatNewPassword } = this.state;

        return !!(oldPassword.length || newPassword.length || repeatNewPassword.length);
    };

    isNewPasswordValidToSave = () => {
        const { oldPassword, newPassword, repeatNewPassword } = this.state;

        return !!(oldPassword.length && newPassword.length && (newPassword === repeatNewPassword));
    };

    render() {
        const { classes } = this.props;
        const { username, email, notifications, oldPassword, newPassword, repeatNewPassword } = this.state;

        const disabled = true;

        return (
          <div className={classes.container}>
              <Helmet>
                  <title>{titlePrefix} | Mijn Profiel</title>
              </Helmet>

              <GridContainer className={"grid-container"}>
                  <GridItem xs={12} sm={12} md={6}>
                      <Paper className={classes.paper}>
                          <div className={classes.avatarWrapper}>
                              <div className={classes.editWrapper}><Edit className={classes.editIcon}/></div>
                              <UserIcon className={classes.avatar}/>
                          </div>

                          <div className={classes.avatarText}>Je kunt je avatar wijzigen</div>

                          <TextField
                            variant="outlined"
                            className={classes.input}
                            label="Gebruikersnaam"
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            disabled={disabled}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                },
                            }}
                          />

                          <TextField
                            variant="outlined"
                            className={classes.input}
                            label="Emailadres"
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            disabled={disabled}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                },
                            }}
                          />

                          <div className={classes.settingsTitle}>
                              <NotificationIcon className={classes.settingsIcon}/>
                              Notificaties instellen
                          </div>

                          <FormControlLabel
                            className={classes.checkbox}
                            control={
                                <Checkbox
                                  color="primary"
                                  value="accepted"
                                />
                            }
                            label={<span>Stuur e-mail notificaties over team activiteit</span>}
                            checked={notifications}
                            onChange={this.toggleCheck}
                          />

                          <div className={classes.actions}>
                              <Button
                                variant="contained"
                                className={`${classes.button} ${classes.cancelButton}`}
                                disabled={disabled}
                                classes={{ disabled: classes.disabled }}
                                onClick={this.setDefaultUserInfo}
                              >Annuleer</Button>

                              <Button
                                variant="contained"
                                className={`${classes.button} ${classes.saveButton}`}
                                disabled={disabled}
                                classes={{ disabled: classes.disabled }}
                                onClick={this.saveUserInfo}
                              >Opslaan</Button>
                          </div>
                      </Paper>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                      <Paper className={classes.paper}>
                          <div className={classes.settingsTitle}>
                              <PasswordIcon className={classes.settingsIcon}/>
                              Wachtwoord instellen
                          </div>

                          <TextField
                            variant="outlined"
                            className={classes.input}
                            label="Huidig wachtwoord"
                            type="password"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={this.onChange}
                            disabled={disabled}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                },
                            }}
                          />

                          <TextField
                            variant="outlined"
                            className={classes.input}
                            label="Wachtwoord"
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={this.onChange}
                            disabled={disabled}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                },
                            }}
                          />

                          <TextField
                            variant="outlined"
                            className={classes.input}
                            label="Wachtwoord nogmaals"
                            type="password"
                            name="repeatNewPassword"
                            value={repeatNewPassword}
                            onChange={this.onChange}
                            disabled={disabled}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                },
                            }}
                          />

                          <div className={classes.actions}>
                              <Button
                                variant="contained"
                                className={`${classes.button} ${classes.cancelButton}`}
                                disabled={disabled}
                                classes={{ disabled: classes.disabled }}
                                onClick={this.setDefaultPassword}
                              >Annuleer</Button>

                              <Button
                                variant="contained"
                                className={`${classes.button} ${classes.saveButton}`}
                                disabled={disabled}
                                classes={{ disabled: classes.disabled }}
                                onClick={this.saveNewPassword}
                              >Opslaan</Button>
                          </div>
                      </Paper>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                      <Button
                        fullWidth
                        onClick={this.removeProfile}
                      >Verwijder mijn profiel</Button>
                  </GridItem>
              </GridContainer>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    deleteUser: () => dispatch(
      openConfirmationDialog(
        "Bevestig uitschrijven",
        "Weet je zeker dat je je wilt uitschrijven?",
        null, null, () => dispatch(deleteUser())
      )
    )
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(MyProfile));