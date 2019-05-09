import { container } from "assets/jss/material-kit-react.jsx";

const WorkspaceWelcomeStyle = theme => ({
    container,
    workspaceWelcomeContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    smallWorkspaceWelcomeContent: {
        background: '#FFF',
        height: 580,
    },
    mainImage: {
        background: `url(${require('assets/img/backgrounds/workspace-welcome.jpg')}) no-repeat center`,
        backgroundSize: 'cover',
        height: 320,
        width: "100%"
    },
    smallMainImage: {
        background: `url(${require('assets/img/backgrounds/workspace-welcome-bg.jpg')}) no-repeat center`,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        width: "auto",
        height: 270,
        backgroundSize: 'cover',
    },
    title: {
        fontFamily: "'dk_black_bamboo-webfont'",
        fontSize: 40,
        fontWeight: 900,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        textAlign: "center",
        color: "#01579b",
        margin: "0 0 24px"
    },
    descr: {
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.5,
        letterSpacing: "normal",
        textAlign: "center",
        color: "#626262",
        margin: "0 0 46px"
    },
    icons: {
        display: "flex",
        justifyContent: "center",
        margin: "-60px 0 30px",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap"
        }
    },
    smallIcons: {
        margin: "-40px 0 10px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 50
    },
    smallButtonContainer: {
        padding: '0 20px',
        marginBottom: 10,
    },
    button: {
        width: "fit-content",
        maxWidth: 380,
        height: 50,
        display: "inline-block",
        cursor: "pointer",
        borderRadius: 5,
        backgroundColor: "#eb621b",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "50px",
        letterSpacing: "normal",
        textAlign: "center",
        color: "#ffffff",
        transition: "all .2s ease",
        outline: "none",
        border: 0,
        boxShadow: "none",
        appearance: "none",
        padding: "0 40px",
        "&:hover": {
            color: "#f1f1f1",
            backgroundColor: "#ef8149"
        },
        "&:active": {
            transform: "translateY(1px)"
        }
    },
    smallButton: {
        width: '100%',
    },
    passive: {
        backgroundColor: "#adabab"
    },
    headerTitleWrapper: {
        width: '100%',
        background: 'rgba(0,0,0,.7)',
        padding: '20px 20px 15px',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        lineHeight: 1.2,
    },
    closeIconWrapper: {
        alignItems: 'center',
        background: 'rgba(255, 255, 255, .2)',
        borderRadius: '50%',
        boxShadow: '0px 17px 44.64px 3.36px rgba(40, 40, 40, 0.17)',
        display: 'flex',
        justifyContent: 'center',
        right: 15,
        position: 'absolute',
        top: 15,
        width: 29,
        height: 29,
        cursor: 'pointer',
        '&:hover': {
            background: '#FFF',
        },
        '&:hover $closeIcon': {
            fill: '#000',
        },
    },
    closeIcon: {
        fill: '#FFF',
        width: 20,
        height: 20,
    },
});
export default WorkspaceWelcomeStyle;