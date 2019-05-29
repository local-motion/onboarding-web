import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Edit from "@material-ui/icons/Edit";

import GridContainer from "../../components/Grid/GridContainer";
import { container } from "../../assets/jss/material-kit-react";
import GridItem from "../../components/Grid/GridItem";
import Checkbox from '@material-ui/core/Checkbox';
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    container: {
        ...container,
        marginTop: 100,
        marginBottom: 70
    },
    paper: {
        alignItems: "center",
        borderRadius: "7px",
        border: "1px dashed #b1defe",
        boxShadow: "0px 5px 10px 0px rgba(40, 40, 40, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%"
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
        width: 65,
        height: 65
    },
    avatarText: {
        marginTop: 80,
        fontSize: 14,
        color: "#626262"
    }
});

const NotificationIcon = () => (
  <SvgIcon width="33px" height="27px">
      <path fillRule="evenodd" fill="rgb(98, 98, 98)"
            d="M31.005,18.482 C30.823,18.639 30.599,18.715 30.377,18.715 C30.105,18.715 29.835,18.601 29.645,18.380 C29.297,17.975 29.343,17.365 29.747,17.017 C30.564,16.314 31.046,15.156 31.037,13.920 C31.028,12.708 30.562,11.629 29.758,10.957 C29.349,10.615 29.294,10.006 29.635,9.597 C29.977,9.187 30.586,9.133 30.995,9.474 C32.234,10.511 32.953,12.126 32.966,13.906 C32.980,15.729 32.265,17.397 31.005,18.482 ZM27.512,17.017 C27.237,17.017 26.964,16.900 26.773,16.673 C26.430,16.265 26.483,15.655 26.891,15.312 C27.259,15.002 27.477,14.493 27.473,13.951 C27.469,13.425 27.261,12.955 26.902,12.663 C26.489,12.326 26.427,11.718 26.764,11.304 C27.100,10.891 27.708,10.828 28.121,11.166 C28.927,11.822 29.394,12.832 29.402,13.936 C29.411,15.064 28.948,16.104 28.133,16.791 C27.952,16.943 27.731,17.017 27.512,17.017 ZM23.996,23.708 L20.092,23.708 C19.681,25.309 18.227,26.497 16.500,26.497 C14.773,26.497 13.318,25.309 12.908,23.708 L9.003,23.708 C7.637,23.708 6.526,22.595 6.526,21.227 L6.526,21.142 C6.526,19.907 7.432,18.880 8.614,18.693 L8.614,11.517 C8.614,8.037 10.875,5.076 14.004,4.028 L14.004,3.002 C14.004,1.624 15.124,0.503 16.500,0.503 C17.876,0.503 18.996,1.624 18.996,3.002 L18.996,4.028 C22.125,5.076 24.386,8.037 24.386,11.517 L24.386,18.693 C25.568,18.880 26.474,19.907 26.474,21.142 L26.474,21.227 C26.474,22.595 25.363,23.708 23.996,23.708 ZM16.500,24.565 C17.125,24.565 17.676,24.240 17.994,23.751 L15.006,23.751 C15.323,24.240 15.874,24.565 16.500,24.565 ZM17.066,3.002 C17.066,2.689 16.812,2.435 16.500,2.435 C16.188,2.435 15.933,2.689 15.933,3.002 L15.933,3.623 L17.066,3.623 L17.066,3.002 ZM22.456,11.517 C22.456,8.229 19.784,5.554 16.500,5.554 C13.215,5.554 10.543,8.229 10.543,11.517 L10.543,18.662 L22.456,18.662 L22.456,11.517 ZM24.544,21.142 C24.544,20.839 24.298,20.593 23.996,20.593 L9.003,20.593 C8.701,20.593 8.456,20.839 8.456,21.142 L8.456,21.227 C8.456,21.530 8.701,21.776 9.003,21.776 L23.996,21.776 C24.298,21.776 24.544,21.530 24.544,21.227 L24.544,21.227 L24.544,21.142 ZM6.226,16.673 C6.036,16.900 5.763,17.017 5.487,17.017 C5.268,17.017 5.048,16.943 4.867,16.791 C4.052,16.104 3.589,15.064 3.597,13.936 C3.606,12.832 4.073,11.822 4.879,11.166 C5.292,10.828 5.900,10.891 6.236,11.304 C6.573,11.718 6.511,12.326 6.097,12.663 C5.739,12.955 5.531,13.425 5.527,13.951 C5.523,14.493 5.740,15.002 6.109,15.312 C6.517,15.655 6.569,16.264 6.226,16.673 ZM3.355,18.380 C3.164,18.601 2.894,18.715 2.623,18.715 C2.400,18.715 2.177,18.639 1.995,18.482 C0.735,17.397 0.020,15.729 0.034,13.906 C0.047,12.126 0.766,10.511 2.005,9.474 C2.414,9.133 3.023,9.187 3.364,9.597 C3.706,10.006 3.651,10.615 3.242,10.957 C2.438,11.629 1.972,12.708 1.963,13.920 C1.954,15.156 2.436,16.314 3.253,17.017 C3.657,17.365 3.703,17.975 3.355,18.380 Z"/>
  </SvgIcon>
);

const PasswordIcon = () => (
  <SvgIcon width="20px" height="26px">
      <path fillRule="evenodd"  fill="rgb(98, 98, 98)"
            d="M17.059,26.000 L2.941,26.000 C1.319,26.000 -0.000,24.633 -0.000,22.953 L-0.000,12.594 C-0.000,10.914 1.319,9.547 2.941,9.547 L4.704,9.547 L4.704,5.371 C4.704,2.409 7.079,-0.000 9.998,-0.000 C12.917,-0.000 15.292,2.409 15.292,5.371 L15.292,9.547 L17.059,9.547 C18.681,9.547 20.000,10.914 20.000,12.594 L20.000,22.953 C20.000,24.633 18.681,26.000 17.059,26.000 ZM13.331,5.371 C13.331,3.529 11.836,2.031 9.998,2.031 C8.160,2.031 6.665,3.529 6.665,5.371 L6.665,9.547 L13.331,9.547 L13.331,5.371 ZM18.039,12.594 C18.039,12.034 17.599,11.578 17.059,11.578 L2.941,11.578 C2.401,11.578 1.961,12.034 1.961,12.594 L1.961,22.953 C1.961,23.513 2.401,23.969 2.941,23.969 L17.059,23.969 C17.599,23.969 18.039,23.513 18.039,22.953 L18.039,12.594 ZM10.979,17.984 L10.979,20.211 C10.979,20.772 10.540,21.227 9.998,21.227 C9.457,21.227 9.018,20.772 9.018,20.211 L9.018,17.981 C8.518,17.647 8.186,17.065 8.186,16.402 C8.186,15.365 8.998,14.523 10.000,14.523 C11.002,14.523 11.814,15.365 11.814,16.402 C11.814,17.067 11.481,17.650 10.979,17.984 Z"/>
  </SvgIcon>
);


class MyProfile extends Component {
    render() {
        const { classes } = this.props;

        return (
          <div className={classes.container}>
              <GridContainer className={"grid-container"}>
                  <GridItem xs={12} sm={12} md={6}>
                      <Paper className={classes.paper}>
                          <div className={classes.avatarWrapper}>
                              <div className={classes.editWrapper}><Edit className={classes.editIcon}/></div>
                              <PermIdentity className={classes.avatar}/>
                          </div>

                          <div className={classes.avatarText}>Je kunt je avatar wijzigen</div>

                          <TextField
                            placeholder="Gebruikersnaam"
                            type="text"
                          />

                          <TextField
                            placeholder="Emailadres"
                            type="text"
                          />

                          <div className={classes.notificationsWrapper}>
                              <div className={classes.notificationsTitle}>
                                  <NotificationIcon className={classes.notificationsIcon}/>
                                  Notificatie instellingen
                              </div>

                              <FormControlLabel
                                control={
                                    <Checkbox
                                      color="primary"
                                      value="accepted"
                                    />
                                }
                                label={<span>Neem contact met mij op over teamactiviteit</span>}
                              />
                          </div>

                          <div className={classes.actions}>
                              <Button>Annuleren</Button>
                              <Button>Opslaan</Button>
                          </div>
                      </Paper>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                      <Paper className={classes.paper}>
                          <div className={classes.passwordSettings}>
                              <PasswordIcon />
                              Wachtwoord instellingen
                          </div>

                          <TextField
                            placeholder="Huidig wachtwoord"
                            type="text"
                          />

                          <TextField
                            placeholder="Wachtwoord"
                            type="text"
                          />

                          <TextField
                            placeholder="Wachtwoord nogmaals"
                            type="text"
                          />

                          <div className={classes.actions}>
                              <Button>Annuleren</Button>
                              <Button>Opslaan</Button>
                          </div>
                      </Paper>
                  </GridItem>

                  <Button>Verwider mijn profiel</Button>
              </GridContainer>
          </div>
        );
    }
}

export default withStyles(styles)(MyProfile);