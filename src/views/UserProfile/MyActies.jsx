import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { getPhaseIcon, getSmokeFreeDate, titlePrefix } from "../../misc/WorkspaceHelpers";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { slugifyPlaygroundName } from "../../components/Playground/PlaygroundActions";

const styles = theme => ({
    wrapper: {
        margin: '40px 0'
    },
    pageTitle: {
        color: 'rgb(8, 92, 166)',
        fontFamily: 'dk_black_bamboo-webfont',
        fontSize: 30,
    },
    list: {
        marginTop: 20,
    },
    paper: {
        border: "1px dashed #b1defe",
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    playgroundImage: {
        height: 100,
        width: 100,
    },
    info: {
        borderRight: "1px dashed #b1defe",
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 20,
    },
    details: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 7,
    },
    name: {
        color: 'rgb(39, 131, 190)',
        fontSize: 23,
        fontWeight: 600,
    },
    detailWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',

        '&:first-child': {
            marginRight: 20,
        },
    },
    infoWrapper: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
    },
    title: {
        color: 'rgb(8, 92, 166)',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 1,
    },
    text: {
        color: ' rgb(98, 98, 98)',
        fontSize: 12,
        lineHeight: 1,
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexBasis: '45%',
        padding: 20,
    },
    phaseWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phaseIconBg: {
        backgroundSize: "contain",
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 55,
        width: 55,
    },
    phaseIconImage: {
        height: 30,
        width: 30,
        backgroundSize: "contain",
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
    },
    phaseInfo: {
        marginLeft: 10,
    },
    phase: {
        color: 'rgb(98, 98, 98)',
        fontFamily: 'dk_black_bamboo-webfont',
        fontSize: 20,
    },
    phaseText: {
        color: 'rgb(8, 92, 166)',
        fontSize: 14,
        fontWeight: 600,
    },
    button: {
        background: '#eb621b',
        color: '#FFF',
        padding: '0px 20px',
        height: 40,

        '&:hover': {
            background: '#ef8149',
            color: '#FFF',
        },
    },
});

const PeopleIcon = ({ className }) => (
  <SvgIcon width="21px" height="24px" viewBox="0 0 21 24" className={className}>
      <path fillRule="evenodd"  fill="rgb(37, 142, 204)"
            d="M20.736,16.590 L16.880,23.059 C16.871,23.073 16.863,23.087 16.853,23.101 C16.503,23.624 15.983,23.950 15.425,23.994 C15.381,23.998 15.337,24.000 15.293,24.000 C14.781,24.000 14.283,23.763 13.910,23.336 L11.421,20.466 C11.111,20.108 11.101,19.516 11.399,19.143 C11.697,18.771 12.190,18.758 12.501,19.116 L14.987,21.984 C15.108,22.122 15.249,22.133 15.321,22.127 C15.392,22.121 15.523,22.090 15.628,21.944 L19.469,15.501 C19.720,15.080 20.206,14.984 20.556,15.285 C20.906,15.586 20.987,16.170 20.736,16.590 ZM18.706,10.834 C17.721,10.009 16.562,9.573 15.356,9.573 C13.811,9.573 12.369,10.278 11.269,11.564 C11.185,12.806 10.704,13.915 9.979,14.707 C10.524,14.962 11.045,15.295 11.533,15.704 C11.886,15.999 11.973,16.583 11.726,17.007 C11.480,17.430 10.995,17.534 10.641,17.239 C9.656,16.413 8.497,15.977 7.291,15.977 C4.698,15.977 2.349,17.985 1.579,20.861 C1.502,21.149 1.543,21.455 1.691,21.699 C1.840,21.944 2.069,22.084 2.321,22.084 L9.100,22.084 C9.531,22.084 9.880,22.503 9.880,23.020 C9.880,23.537 9.531,23.956 9.100,23.956 L2.321,23.956 C1.565,23.956 0.877,23.535 0.432,22.802 C-0.014,22.068 -0.136,21.152 0.095,20.288 C0.793,17.683 2.507,15.640 4.620,14.689 C3.830,13.816 3.334,12.564 3.334,11.176 C3.334,8.545 5.117,6.404 7.308,6.404 C8.976,6.404 10.408,7.645 10.996,9.399 C11.423,9.027 11.881,8.710 12.369,8.453 C12.476,8.396 12.584,8.343 12.692,8.293 C11.898,7.419 11.399,6.164 11.399,4.772 C11.399,2.141 13.182,-0.000 15.373,-0.000 C17.564,-0.000 19.347,2.141 19.347,4.772 C19.347,6.170 18.844,7.429 18.044,8.303 C18.589,8.558 19.110,8.891 19.598,9.299 C19.951,9.595 20.038,10.178 19.792,10.602 C19.545,11.026 19.060,11.130 18.706,10.834 ZM7.308,8.275 C5.976,8.275 4.892,9.577 4.892,11.176 C4.892,12.776 5.976,14.077 7.308,14.077 C8.640,14.077 9.724,12.776 9.724,11.176 C9.724,9.577 8.640,8.275 7.308,8.275 ZM15.373,1.871 C14.041,1.871 12.957,3.173 12.957,4.772 C12.957,6.372 14.041,7.673 15.373,7.673 C16.705,7.673 17.789,6.372 17.789,4.772 C17.789,3.173 16.705,1.871 15.373,1.871 Z"/>
  </SvgIcon>
);

const DateIcon = ({ className }) => (
  <SvgIcon width="25px" height="24px" viewBox="0 0 25 24" className={className}>
      <path fillRule="evenodd"  fill="rgb(37, 142, 204)"
            d="M6.129,18.937 C5.614,18.937 5.196,18.518 5.196,18.000 C5.196,17.482 5.614,17.062 6.129,17.062 C6.645,17.062 7.063,17.482 7.063,18.000 C7.063,18.518 6.645,18.937 6.129,18.937 ZM6.129,10.781 C5.614,10.781 5.196,10.361 5.196,9.843 C5.196,9.326 5.614,8.906 6.129,8.906 C6.645,8.906 7.063,9.326 7.063,9.843 C7.063,10.361 6.645,10.781 6.129,10.781 ZM6.129,14.859 C5.614,14.859 5.196,14.439 5.196,13.922 C5.196,13.404 5.614,12.984 6.129,12.984 C6.645,12.984 7.063,13.404 7.063,13.922 C7.063,14.439 6.645,14.859 6.129,14.859 ZM10.190,18.937 C9.675,18.937 9.257,18.518 9.257,18.000 C9.257,17.482 9.675,17.062 10.190,17.062 C10.706,17.062 11.123,17.482 11.123,18.000 C11.123,18.518 10.706,18.937 10.190,18.937 ZM10.190,10.781 C9.675,10.781 9.257,10.361 9.257,9.843 C9.257,9.326 9.675,8.906 10.190,8.906 C10.706,8.906 11.123,9.326 11.123,9.843 C11.123,10.361 10.706,10.781 10.190,10.781 ZM10.190,14.859 C9.675,14.859 9.257,14.439 9.257,13.922 C9.257,13.404 9.675,12.984 10.190,12.984 C10.706,12.984 11.123,13.404 11.123,13.922 C11.123,14.439 10.706,14.859 10.190,14.859 ZM23.258,11.906 C22.743,11.906 22.325,11.486 22.325,10.969 L22.325,5.625 C22.325,4.591 21.487,3.750 20.458,3.750 L19.244,3.750 L19.244,4.687 C19.244,5.205 18.827,5.625 18.311,5.625 C17.795,5.625 17.378,5.205 17.378,4.687 L17.378,3.750 L13.130,3.750 L13.130,4.687 C13.130,5.205 12.712,5.625 12.197,5.625 C11.681,5.625 11.264,5.205 11.264,4.687 L11.264,3.750 L7.063,3.750 L7.063,4.687 C7.063,5.205 6.645,5.625 6.129,5.625 C5.614,5.625 5.196,5.205 5.196,4.687 L5.196,3.750 L4.029,3.750 C3.000,3.750 2.162,4.591 2.162,5.625 L2.162,20.250 C2.162,21.284 3.000,22.125 4.029,22.125 L11.170,22.125 C11.686,22.125 12.104,22.545 12.104,23.062 C12.104,23.580 11.686,24.000 11.170,24.000 L4.029,24.000 C1.970,24.000 0.296,22.318 0.296,20.250 L0.296,5.625 C0.296,3.557 1.970,1.875 4.029,1.875 L5.196,1.875 L5.196,0.937 C5.196,0.420 5.614,-0.000 6.129,-0.000 C6.645,-0.000 7.063,0.420 7.063,0.937 L7.063,1.875 L11.264,1.875 L11.264,0.937 C11.264,0.420 11.681,-0.000 12.197,-0.000 C12.712,-0.000 13.130,0.420 13.130,0.937 L13.130,1.875 L17.378,1.875 L17.378,0.937 C17.378,0.420 17.795,-0.000 18.311,-0.000 C18.827,-0.000 19.244,0.420 19.244,0.937 L19.244,1.875 L20.458,1.875 C22.517,1.875 24.192,3.557 24.192,5.625 L24.192,10.969 C24.192,11.486 23.774,11.906 23.258,11.906 ZM13.317,9.843 C13.317,9.326 13.735,8.906 14.250,8.906 C14.766,8.906 15.184,9.326 15.184,9.843 C15.184,10.361 14.766,10.781 14.250,10.781 C13.735,10.781 13.317,10.361 13.317,9.843 ZM17.378,9.843 C17.378,9.326 17.795,8.906 18.311,8.906 C18.827,8.906 19.244,9.326 19.244,9.843 C19.244,10.361 18.827,10.781 18.311,10.781 C17.795,10.781 17.378,10.361 17.378,9.843 ZM18.544,12.656 C21.658,12.656 24.192,15.201 24.192,18.328 C24.192,21.456 21.658,24.000 18.544,24.000 C15.430,24.000 12.897,21.456 12.897,18.328 C12.897,15.201 15.430,12.656 18.544,12.656 ZM18.544,22.125 C20.629,22.125 22.325,20.422 22.325,18.328 C22.325,16.234 20.629,14.531 18.544,14.531 C16.460,14.531 14.764,16.234 14.764,18.328 C14.764,20.422 16.460,22.125 18.544,22.125 ZM18.544,15.469 C19.060,15.469 19.478,15.888 19.478,16.406 L19.478,17.390 L19.898,17.390 C20.413,17.390 20.831,17.810 20.831,18.328 C20.831,18.846 20.413,19.265 19.898,19.265 L18.544,19.265 C18.029,19.265 17.611,18.846 17.611,18.328 L17.611,16.406 C17.611,15.888 18.029,15.469 18.544,15.469 Z"/>
  </SvgIcon>
);


class MyActies extends Component {
    render() {
        const { classes, playgrounds } = this.props;

        return (
          <div className={classes.wrapper}>
              <Helmet>
                  <title>{titlePrefix} | Mijn Acties</title>
              </Helmet>

              <div className={classes.pageTitle}>Mijn Acties</div>

              <div className={classes.list}>
                  {playgrounds.map((playground) => {
                      const icon = getPhaseIcon(playground);

                      return (
                        <Paper className={classes.paper} key={playground.id}>
                            <img className={classes.playgroundImage} src={require('../../assets/img/playground-image.jpg')} alt={playground.name}/>
                            <div className={classes.info}>
                                <div className={classes.name}>{playground.name}</div>
                                <div className={classes.details}>
                                    <div className={classes.detailWrapper}>
                                        <PeopleIcon />
                                        <div className={classes.infoWrapper}>
                                            <div className={classes.title}>{playground.volunteerCount}</div>
                                            <div className={classes.text}>Aantal teamleden</div>
                                        </div>
                                    </div>
                                    <div className={classes.detailWrapper}>
                                        <DateIcon />
                                        <div className={classes.infoWrapper}>
                                            <div className={classes.title}>{getSmokeFreeDate(playground.smokeFreeDate)}</div>
                                            <div className={classes.text}>Rookvrij datum</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.actions}>
                                <div className={classes.phaseWrapper}>
                                    <div
                                      style={{ backgroundImage: `url(${icon.bg})` }}
                                      className={classes.phaseIconBg}>
                                        <div
                                          style={{ backgroundImage: `url(${icon.icon})` }}
                                          className={classes.phaseIconImage}
                                        />
                                    </div>
                                    <div className={classes.phaseInfo}>
                                        <div className={classes.phase}>{icon.title}</div>
                                        <div className={classes.phaseText}>Actieve fase</div>
                                    </div>
                                </div>

                                <Button component={Link} className={classes.button} to={`/actie/${slugifyPlaygroundName(playground)}`}>Bekijk speelplaats</Button>
                            </div>
                        </Paper>
                      );
                  })}
              </div>
          </div>
        );
    }
}

export default withStyles(styles)(MyActies);
