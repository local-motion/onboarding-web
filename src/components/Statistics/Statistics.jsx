import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import SvgIcon from "@material-ui/core/SvgIcon";

import { slugifyPlaygroundName } from "../Playground/PlaygroundActions";
import { getSmokeFreeDate } from "../../misc/WorkspaceHelpers";

const styles = theme => ({
    statistics: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 35,
        position: 'relative',
    },
    smallStatistics: {
        flexWrap: 'nowrap',
        marginBottom: 60,
    },
    statistic: {
        background: '#FFF',
        borderRadius: 40,
        border: '1px solid #c5e3f5',
        display: 'flex',
        flexDirection: 'column',
        height: 70,
        justifyContent: 'center',
        margin: 20,
        paddingLeft: 90,
        position: 'relative',
        width: 340,
        zIndex: 4,
    },
    smallStatisticLeft: {
        borderRadius: '40px 0 0 40px',
        display: 'flex',
        height: 50,
        margin: 0,
        paddingLeft: 0,
        width: 160,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRight: 0,
    },
    smallStatisticRight: {
        borderRadius: '0 40px 40px 0',
        display: 'flex',
        height: 50,
        margin: 0,
        paddingLeft: 0,
        width: 160,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconWrapper: {
        alignItems: 'center',
        background: '#258ecc',
        borderRadius: '50%',
        display: 'flex',
        height: 80,
        justifyContent: 'center',
        left: '-6px',
        position: 'absolute',
        top: '-6px',
        width: 80,
    },
    smallIconWrapper: {
        height: 50,
        justifyContent: 'center',
        position: 'static',
        width: 50,
        minWidth: 50,
        marginLeft: -1,
    },
    icon: {
        height: '100%',
        maxHeight: 36,
        maxWidth: 36,
        width: '100%',
    },
    smallIcon: {
        maxHeight: 23,
        maxWidth: 23,
    },
    line: {
        background: '#c5e3f5',
        height: 1,
        position: 'absolute',
        top: '50%',
        width: '100%',
        zIndex: 2,
    },
    smallLine: {
        display: 'none',
    },
    text: {
        marginTop: 5,
    },
    smallTextLeft: {
        marginTop: 0,
        marginLeft: 10,
    },
    smallTextRight: {
        marginTop: 0,
        marginRight: 10,
        textAlign: 'right',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Arial',
        color: 'rgb(8, 92, 166)',
        fontWeight: 'bold',
        lineHeight: 0.9,
    },
    smallTitle: {
        fontSize: 16,
        fontFamily: 'Arial',
        color: 'rgb(8, 92, 166)',
        fontWeight: 'bold',
        lineHeight: 1,
    },
    description: {
        fontSize: 14,
        color: 'rgb(98, 98, 98)',
    },
    smallDescription: {
        fontSize: 12,
        lineHeight: 1,
    },
});



const Statistics = ({ playground, classes, view }) => {
    const isViewSmall = view === 'small';
    const getSmallClassFor = name => isViewSmall ? classes[name] : '';

    return (
        <div className={`${classes.statistics} ${getSmallClassFor('smallStatistics')}`}>
            <div className={`${classes.line} ${getSmallClassFor('smallLine')}`} />
            <Link
              to={`/actie/${slugifyPlaygroundName(playground)}/mensen-verzamelen`}
              className={`${classes.statistic} ${getSmallClassFor('smallStatisticLeft')}`}
            >
                <div className={`${classes.iconWrapper} ${getSmallClassFor('smallIconWrapper')}`}>
                    <SvgIcon className={`${classes.icon} ${getSmallClassFor('smallIcon')}`} viewBox="0 0 36 36">
                        <path fillRule="evenodd" fill="rgb(255, 255, 255)"
                              d="M32.783,24.886 L26.875,34.589 C26.862,34.610 26.849,34.631 26.835,34.651 C26.298,35.436 25.501,35.925 24.646,35.992 C24.579,35.997 24.511,36.000 24.444,36.000 C23.659,36.000 22.897,35.644 22.326,35.005 L18.513,30.700 C18.038,30.163 18.022,29.274 18.479,28.715 C18.935,28.156 19.691,28.138 20.167,28.675 L23.976,32.976 C24.161,33.183 24.376,33.199 24.487,33.191 C24.595,33.182 24.797,33.135 24.957,32.916 L30.841,23.252 C31.225,22.621 31.971,22.476 32.507,22.927 C33.043,23.378 33.166,24.255 32.783,24.886 ZM29.673,16.252 C28.164,15.014 26.389,14.359 24.541,14.359 C22.173,14.359 19.965,15.417 18.280,17.347 C18.152,19.210 17.415,20.873 16.303,22.061 C17.139,22.443 17.937,22.943 18.684,23.556 C19.225,23.999 19.358,24.874 18.980,25.510 C18.603,26.146 17.859,26.302 17.318,25.858 C15.809,24.620 14.034,23.966 12.186,23.966 C8.213,23.966 4.615,26.978 3.435,31.292 C3.317,31.724 3.380,32.182 3.607,32.549 C3.835,32.916 4.186,33.126 4.572,33.126 L14.957,33.126 C15.617,33.126 16.151,33.755 16.151,34.530 C16.151,35.305 15.617,35.934 14.957,35.934 L4.572,35.934 C3.414,35.934 2.360,35.303 1.678,34.203 C0.996,33.102 0.808,31.728 1.163,30.432 C2.232,26.525 4.857,23.461 8.095,22.034 C6.884,20.725 6.124,18.847 6.124,16.765 C6.124,12.817 8.855,9.606 12.212,9.606 C14.768,9.606 16.961,11.468 17.862,14.099 C18.515,13.540 19.218,13.066 19.964,12.679 C20.129,12.595 20.294,12.514 20.460,12.439 C19.243,11.129 18.479,9.247 18.479,7.158 C18.479,3.211 21.210,-0.000 24.567,-0.000 C27.924,-0.000 30.655,3.211 30.655,7.158 C30.655,9.255 29.884,11.144 28.658,12.455 C29.494,12.837 30.292,13.336 31.039,13.949 C31.580,14.393 31.713,15.268 31.335,15.904 C30.958,16.539 30.214,16.695 29.673,16.252 ZM12.212,12.413 C10.171,12.413 8.511,14.365 8.511,16.765 C8.511,19.164 10.171,21.116 12.212,21.116 C14.252,21.116 15.912,19.164 15.912,16.765 C15.912,14.365 14.252,12.413 12.212,12.413 ZM24.567,2.807 C22.526,2.807 20.866,4.759 20.866,7.158 C20.866,9.558 22.526,11.510 24.567,11.510 C26.607,11.510 28.267,9.558 28.267,7.158 C28.267,4.759 26.607,2.807 24.567,2.807 Z"/>
                    </SvgIcon>
                </div>

                <div className={`${classes.text} ${getSmallClassFor('smallTextLeft')}`}>
                    <div className={`${classes.title} ${getSmallClassFor('smallTitle')}`}>{playground.volunteerCount}</div>
                    <div className={`${classes.description} ${getSmallClassFor('smallDescription')}`}>Aantal teamleden</div>
                </div>
            </Link>
            <Link
              to={`/actie/${slugifyPlaygroundName(playground)}/kies-moment-van-invoering`}
              className={`${classes.statistic} ${getSmallClassFor('smallStatisticRight')}`}
            >
                <div className={`${classes.iconWrapper} ${getSmallClassFor('smallIconWrapper')}`}>
                    <SvgIcon className={`${classes.icon} ${getSmallClassFor('smallIcon')}`} viewBox="0 0 36 36">
                        <path fillRule="evenodd" fill="rgb(255, 255, 255)"
                              d="M8.789,28.406 C8.012,28.406 7.383,27.777 7.383,27.000 C7.383,26.223 8.012,25.594 8.789,25.594 C9.566,25.594 10.195,26.223 10.195,27.000 C10.195,27.777 9.566,28.406 8.789,28.406 ZM8.789,16.172 C8.012,16.172 7.383,15.542 7.383,14.766 C7.383,13.989 8.012,13.359 8.789,13.359 C9.566,13.359 10.195,13.989 10.195,14.766 C10.195,15.542 9.566,16.172 8.789,16.172 ZM8.789,22.289 C8.012,22.289 7.383,21.659 7.383,20.883 C7.383,20.106 8.012,19.477 8.789,19.477 C9.566,19.477 10.195,20.106 10.195,20.883 C10.195,21.659 9.566,22.289 8.789,22.289 ZM14.906,28.406 C14.130,28.406 13.500,27.777 13.500,27.000 C13.500,26.223 14.130,25.594 14.906,25.594 C15.683,25.594 16.312,26.223 16.312,27.000 C16.312,27.777 15.683,28.406 14.906,28.406 ZM14.906,16.172 C14.130,16.172 13.500,15.542 13.500,14.766 C13.500,13.989 14.130,13.359 14.906,13.359 C15.683,13.359 16.312,13.989 16.312,14.766 C16.312,15.542 15.683,16.172 14.906,16.172 ZM14.906,22.289 C14.130,22.289 13.500,21.659 13.500,20.883 C13.500,20.106 14.130,19.477 14.906,19.477 C15.683,19.477 16.312,20.106 16.312,20.883 C16.312,21.659 15.683,22.289 14.906,22.289 ZM34.594,17.859 C33.817,17.859 33.187,17.230 33.187,16.453 L33.187,8.437 C33.187,6.887 31.926,5.625 30.375,5.625 L28.547,5.625 L28.547,7.031 C28.547,7.808 27.917,8.437 27.141,8.437 C26.364,8.437 25.734,7.808 25.734,7.031 L25.734,5.625 L19.336,5.625 L19.336,7.031 C19.336,7.808 18.706,8.437 17.930,8.437 C17.153,8.437 16.523,7.808 16.523,7.031 L16.523,5.625 L10.195,5.625 L10.195,7.031 C10.195,7.808 9.566,8.437 8.789,8.437 C8.012,8.437 7.383,7.808 7.383,7.031 L7.383,5.625 L5.625,5.625 C4.074,5.625 2.812,6.887 2.812,8.437 L2.812,30.375 C2.812,31.926 4.074,33.187 5.625,33.187 L16.383,33.187 C17.159,33.187 17.789,33.817 17.789,34.594 C17.789,35.370 17.159,36.000 16.383,36.000 L5.625,36.000 C2.523,36.000 -0.000,33.477 -0.000,30.375 L-0.000,8.437 C-0.000,5.336 2.523,2.812 5.625,2.812 L7.383,2.812 L7.383,1.406 C7.383,0.630 8.012,-0.000 8.789,-0.000 C9.566,-0.000 10.195,0.630 10.195,1.406 L10.195,2.812 L16.523,2.812 L16.523,1.406 C16.523,0.630 17.153,-0.000 17.930,-0.000 C18.706,-0.000 19.336,0.630 19.336,1.406 L19.336,2.812 L25.734,2.812 L25.734,1.406 C25.734,0.630 26.364,-0.000 27.141,-0.000 C27.917,-0.000 28.547,0.630 28.547,1.406 L28.547,2.812 L30.375,2.812 C33.477,2.812 36.000,5.336 36.000,8.437 L36.000,16.453 C36.000,17.230 35.370,17.859 34.594,17.859 ZM19.617,14.766 C19.617,13.989 20.247,13.359 21.023,13.359 C21.800,13.359 22.430,13.989 22.430,14.766 C22.430,15.542 21.800,16.172 21.023,16.172 C20.247,16.172 19.617,15.542 19.617,14.766 ZM25.734,14.766 C25.734,13.989 26.364,13.359 27.141,13.359 C27.917,13.359 28.547,13.989 28.547,14.766 C28.547,15.542 27.917,16.172 27.141,16.172 C26.364,16.172 25.734,15.542 25.734,14.766 ZM27.492,18.984 C32.183,18.984 36.000,22.801 36.000,27.492 C36.000,32.183 32.183,36.000 27.492,36.000 C22.801,36.000 18.984,32.183 18.984,27.492 C18.984,22.801 22.801,18.984 27.492,18.984 ZM27.492,33.187 C30.632,33.187 33.187,30.633 33.187,27.492 C33.187,24.352 30.632,21.797 27.492,21.797 C24.352,21.797 21.797,24.352 21.797,27.492 C21.797,30.633 24.352,33.187 27.492,33.187 ZM27.492,23.203 C28.269,23.203 28.898,23.833 28.898,24.609 L28.898,26.086 L29.531,26.086 C30.308,26.086 30.937,26.715 30.937,27.492 C30.937,28.269 30.308,28.898 29.531,28.898 L27.492,28.898 C26.715,28.898 26.086,28.269 26.086,27.492 L26.086,24.609 C26.086,23.833 26.715,23.203 27.492,23.203 Z"/>
                    </SvgIcon>
                </div>

                <div className={`${classes.text} ${getSmallClassFor('smallTextRight')}`}>
                    <div className={`${classes.title} ${getSmallClassFor('smallTitle')}`}>{getSmokeFreeDate(playground.smokeFreeDate)}</div>
                    <div className={`${classes.description} ${getSmallClassFor('smallDescription')}`}>Rookvrij datum</div>
                </div>
            </Link>
        </div>
    );
};

export default withStyles(styles)(Statistics);