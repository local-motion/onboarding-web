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
        margin: "100px 30px 0px",
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
};

export default componentsStyle;
