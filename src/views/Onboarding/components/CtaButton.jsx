import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import classnames from 'classnames';

const ArrowIcon = () => (
  <SvgIcon width="18px" height="14px" viewBox="0 0 24 17">
      <path fillRule="evenodd"
            d="M16.739,6.288 L10.661,0.288 C10.269,-0.100 9.636,-0.095 9.248,
            0.298 C8.860,0.691 8.864,1.324 9.258,1.712 L13.601,6.000 L1.963,
            6.000 C1.410,6.000 0.963,6.447 0.963,7.000 C0.963,7.553 1.410,
            8.000 1.963,8.000 L13.601,8.000 L9.258,12.288 C8.864,12.676 8.861,
            13.309 9.248,13.702 C9.444,13.900 9.702,14.000 9.960,14.000 C10.213,
            14.000 10.467,13.904 10.661,13.712 L16.739,7.712 C16.929,
            7.524 17.037,7.268 17.037,7.000 C17.037,6.732 16.930,6.477 16.739,
            6.288 Z"
      />
  </SvgIcon>
);

const styles = theme => ({
    ctaButton: {
        backgroundColor: '#FFF',
        borderRadius: 31,
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        color: 'rgb(8, 92, 166)',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 1.2,
        marginTop: 45,
        maxHeight: 57,
        maxWidth: 270,
        padding: '14px 20px 14px 40px',
        textTransform: 'none',
        transition: 'all .2s',
        width: '100%',
        '& > span': {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        },
        '& svg': {
            fill: 'rgb(8, 92, 166)',
            marginLeft: 10,
            marginTop: 4,
        },
        '&:hover': {
            color: 'rgb(37, 142, 204)',
            backgroundColor: 'rgb(234, 236, 246)',
        },
        '&:hover svg': {
            fill: 'rgb(37, 142, 204)',
            marginLeft: 22,
        },
        '&:hover $buttonTitle': {
            marginLeft: 12,
        },
    },
    buttonTitle: {},
    outlined: {
        borderWidth: 2,
        borderColor: 'rgb(177, 222, 254)',
        borderStyle: 'solid',
        boxShadow: 'none',
        '& svg': {
            fill: 'rgb(8, 92, 166)',
            marginLeft: 10,
            marginTop: 4,
        },
        '&:hover': {
            color: '#FFF',
            borderColor: '#FFF',
            backgroundColor: 'rgb(8, 92, 166)',
        },
        '&:hover svg': {
            fill: '#FFF',
            marginLeft: 22,
        },
    },
    square: {
        background: '#eb621b',
        color: '#FFF',
        borderRadius: 5,
        '& svg': {
            fill: '#FFF',
            marginLeft: 10,
            marginTop: 4,
        },
        '&:hover': {
            color: '#FFF',
            borderColor: '#FFF',
            backgroundColor: 'rgba(235, 98, 27, .8)',
        },
        '&:hover svg': {
            fill: '#FFF',
            marginLeft: 22,
        },
    }
});


const CtaButton = ({ classes, onClick, text, type, customStyle }) => (
  <Button onClick={onClick} className={classnames(classes.ctaButton, classes[type], customStyle)}>
      <span className={classes.buttonTitle}>{text}</span>
      <ArrowIcon />
  </Button>
);

export default withStyles(styles)(CtaButton);