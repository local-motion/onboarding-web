import {container} from "assets/jss/material-kit-react.jsx";

const componentsStyle = {
    container,
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
        margin: "10px 30px 0px",
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
    },
    playgroundsTitle: {
        background: '#FFF',
        borderTop: '1px solid rgb(217, 220, 232)',
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        fontSize: 36,
        color: 'rgb(8, 92, 166)',
        lineHeight: 1.2,
        textAlign: 'center',
        padding: '10px 0',
        fontFamily: 'dk_black_bamboo-webfont',
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
    },
    playgroundTitle: {
        fontFamily: "'dk_black_bamboo-webfont'",
        color: '#085ca6',
    },
    backButton: {
        marginTop: 70,
        marginBottom: 20,
        marginLeft: 30,
    },
};

export default componentsStyle;
