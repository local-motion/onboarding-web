import {container} from "assets/jss/material-kit-react.jsx";

const componentsStyle = theme => ({
    container,
    wrapper: {
        background: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        height: '100%',
    },
    brand: {
        color: "#FFFFFF",
        textAlign: "left"
    },
    title: {
        fontSize: "4.2rem",
        fontWeight: "600",
        display: "inline-block",
        position: "relative"
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px 0 0"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainDown: {
        background: "#FFFFFF",
        padding: "15px",
        margin: "10px 0px 15px",
        borderRadius: "6px",
        boxShadow:
          "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
          "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    playgroundsBg: {
        background: `url(${require('../../../img/landing/playground-map-bg.png')}) no-repeat right bottom`,
        backgroundPositionX: 200,
        position: 'absolute',
        right: 0,
        bottom: -250,
        width: 720,
        height: 720,

        [theme.breakpoints.down('sm')]: {
            width: 340,
            bottom: -120,
            height: 370,
            backgroundPositionX: 0,
            backgroundSize: 'cover',
        },

        [theme.breakpoints.down('xs')]: {
            width: 240,
            bottom: -65,
            height: 270,
            backgroundPositionX: 0,
            backgroundSize: 'cover',
        },
    },
    playgroundsTitle: {
        background: '#FFF',
        borderTop: '1px solid rgb(217, 220, 232)',
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        fontSize: 36,
        color: 'rgb(8, 92, 166)',
        lineHeight: 1.2,
        textAlign: 'center',
        padding: '10px 30px',
        fontFamily: 'dk_black_bamboo-webfont',

        [theme.breakpoints.down('sm')]: {
            fontSize: 30,
        },
    },
    link: {
        textDecoration: "none"
    },
    textCenter: {
        textAlign: "center"
    },
    workspacePaper: {
        display: 'flex',
        borderRadius: '7px',
        overflow: 'hidden',
        width: '100%',
        flexWrap: 'wrap',
    },
    playgroundTitle: {
        fontFamily: "'dk_black_bamboo-webfont'",
        color: '#085ca6',
    },
    noButton: {
        width: 45,
    },
    ctaDone: {
        marginLeft: 10,
    },
    backButton: {
        marginTop: -30,
        marginBottom: 20,
    },
    customWrappedHeader: {
        paddingBottom: 30,
    },
    closeIconWrapper: {
        alignItems: 'center',
        background: '#FFF',
        border: '1px solid rgb(231, 231, 231)',
        borderRadius: '50%',
        boxShadow: '0px 17px 44.64px 3.36px rgba(40, 40, 40, 0.17)',
        display: 'flex',
        justifyContent: 'center',
        left: -40,
        position: 'absolute',
        top: 10,
        width: 29,
        height: 29,
        cursor: 'pointer',
        '&:hover': {
            background: '#258ecc',
        },
        '&:hover $closeIcon': {
            fill: '#FFF',
        },
    },
    closeIcon: {
        width: 15,
        height: 15,
    },
});

export default componentsStyle;
