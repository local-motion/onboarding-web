import { container } from "../assets/jss/material-kit-react";
import React from 'react';
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";

export const style = {
    width: '20rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    input: {borderRadius: 0, display: 'block', marginBottom: 10},
    links: {fontSize: '0.9em', minHeight: "25px"},
    extraButton: {marginTop: 15},
    signUpButton: {margin: '0 auto', marginTop: 10, width: 'fit-content'},
    loginButton: {margin: '0 auto', width: 'fit-content'},
    left: {float: "left"},
    right: {float: "right"},
    alert: {fontSize: '0.8em'},
    media: {height: '300px', margin: '-25px', marginBottom: 30, backgroundPositionY: -130},
    secureAppContainer: {
        margin: '0 auto',
        justifyContent: "center",
    },
    createAccountTitle: {fontWeight: 'bold', marginTop: 20, marginBottom: 0},
}

// Icons

export const PadlockIcon = ({ className }) => (
    <SvgIcon width="20px" height="26px" viewBox="0 0 20 26" className={className}>
        <path fillRule="evenodd" fill="rgb(98, 98, 98)"
              d="M17.059,26.000 L2.941,26.000 C1.319,26.000 -0.000,24.633 -0.000,22.953 L-0.000,12.594 C-0.000,10.914 1.319,9.547 2.941,9.547 L4.704,9.547 L4.704,5.371 C4.704,2.409 7.079,-0.000 9.998,-0.000 C12.917,-0.000 15.292,2.409 15.292,5.371 L15.292,9.547 L17.059,9.547 C18.681,9.547 20.000,10.914 20.000,12.594 L20.000,22.953 C20.000,24.633 18.681,26.000 17.059,26.000 ZM13.331,5.371 C13.331,3.529 11.836,2.031 9.998,2.031 C8.160,2.031 6.665,3.529 6.665,5.371 L6.665,9.547 L13.331,9.547 L13.331,5.371 ZM18.039,12.594 C18.039,12.034 17.599,11.578 17.059,11.578 L2.941,11.578 C2.401,11.578 1.961,12.034 1.961,12.594 L1.961,22.953 C1.961,23.513 2.401,23.969 2.941,23.969 L17.059,23.969 C17.599,23.969 18.039,23.513 18.039,22.953 L18.039,12.594 ZM10.979,17.984 L10.979,20.211 C10.979,20.772 10.540,21.227 9.998,21.227 C9.457,21.227 9.018,20.772 9.018,20.211 L9.018,17.981 C8.518,17.647 8.186,17.065 8.186,16.402 C8.186,15.365 8.998,14.523 10.000,14.523 C11.002,14.523 11.814,15.365 11.814,16.402 C11.814,17.067 11.481,17.650 10.979,17.984 Z"/>
    </SvgIcon>
  );


// Styles

export const styles = theme => ({
    media: {
        height: '300px', 
        margin: '-25px', 
        marginBottom: 30, 
        backgroundPositionY: -130
    },
    title: {
        fontWeight: 'bold', 
        marginTop: 20, 
        marginBottom: 0
    },
    text: {
        margin: '15px',
    },
    links: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '15px 0',

        // [theme.breakpoints.down('md')]: {
        //     marginTop: 37,
        // },

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    link: {
        margin: '0 10px',
        fontSize: 14,
        color: '#626262',
        lineHeight: 1.2,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        position: 'relative',
        '&:after': {
            content: "''",
            position: 'absolute',
            height: '2px',
            background: 'rgb(177, 222, 254)',
            width: '100%',
            bottom: -4,
            left: 0,
            visibility: 'hidden',
        },
        '&:hover': {
            color: 'rgb(8, 92, 166)',
            '&:after': {
                visibility: 'visible',
            },
        },

        [theme.breakpoints.down('md')]: {
            margin: '8px 20px',
        },
    },
    secureAppContainer: {
        margin: 'auto',
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: '100%',
    },
    checkmark: {
        color: 'green'
    },
    specialCharacters: {
        fontWeight: 'bold',
    },
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
        margin: '20px 0 10px',

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
