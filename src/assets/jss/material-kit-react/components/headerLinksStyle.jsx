import { defaultFont } from "../../../../assets/jss/material-kit-react.jsx";

import tooltip from "../../../../assets/jss/material-kit-react/tooltipsStyle.jsx";

const headerLinksStyle = theme => ({
    list: {
        ...defaultFont,
        fontSize: "14px",
        margin: 0,
        paddingLeft: "0",
        listStyle: "none",
        paddingTop: "0",
        paddingBottom: "0",
        color: "inherit",
        display: "flex",
        alignItems: "center"
    },
    listItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        padding: "0",
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    },
    listItemText: {
        padding: "0 !important"
    },
    navLink: {
        padding: 0,
        borderRadius: "50%",
        border: "1px solid #b1defe",
        width: 46,
        height: 46,
        margin: "0 30px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',

        "&:hover": {
            background: "#258ecc",
            borderColor: "#258ecc"
        },

        "&:active": {
            background: "#085ca6",
            borderColor: "#085ca6"
        },

        "&:hover $navIcon, &:active $navIcon": {
            fill: "#FFF"
        },

        [theme.breakpoints.down("sm")]: {
            width: 35,
            height: 35,
        },

        [theme.breakpoints.down("xs")]: {
            width: 25,
            height: 25,
            margin: '0 5px',
        },
    },
    navIcon: {
        fill: "#000",

        [theme.breakpoints.down("xs")]: {
            width: "16px !important",
            height: "16px !important",
        },
    },
    profileLink: {
        padding: 0,
    },
    profileIcon: {
        fill: "#3f51b5",
        height: "25px !important",
        width: "25px !important",
        margin: "0 !important",

        [theme.breakpoints.down("xs")]: {
            width: "20px !important",
            height: "20px !important",
        },
    },
    profileName: {
        padding: 10,
    },
    notificationNavLink: {
        color: "inherit",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        top: "4px"
    },
    notifications: {
        width: "80%",
        maxWidth: 400,
    },
    registerNavLink: {
        top: "3px",
        position: "relative",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex"
    },
    navLinkActive: {
        color: "inherit",
        backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    icons: {
        width: "20px",
        height: "20px",
        marginRight: "3px"
    },
    socialIcons: {
        position: "relative",
        fontSize: "20px !important",
        marginRight: "4px"
    },
    dropdownLink: {
        "&,&:hover,&:focus": {
            color: "inherit",
            textDecoration: "none",
            display: "block",
            padding: "10px 20px"
        }
    },
    ...tooltip,
    marginRight5: {
        marginRight: "5px"
    }
});

export default headerLinksStyle;
