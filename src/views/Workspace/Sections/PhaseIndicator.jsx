import React from "react";
//import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';

import { playgroundIcons } from 'components/PlaygroundIcons/playgroundIconsConstants';

import classNames from 'classnames';

const styles = theme => ({
    button: {
        marginRight: theme.spacing.unit,
        bgColor: 'red',
        color: 'black',

    },
    icon: {
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'inherit',
        cursor: 'pointer',
        padding: '0 10px',
        '&:hover $iconBgImage': {
            boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        }
    },
    iconBgImage: {
        width: 120,
        height: 120,
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all .2s ease',
        transformOrigin: '50% 50%',
        [theme.breakpoints.down("sm")]: {
            width: 70,
            height: 70,
        }
    },
    iconImage: {
        width: 42,
        height: 42,
        backgroundSize: 'contain',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.down("sm")]: {
            width: 20,
            height: 20,
        }
    },
    active: {
        transform: 'scale(1.2)',
    },
    completed: {
        display: 'inline-block',
    },
    inactive: {
        bgColor: 'red'
    },
    stepper: {
        background: "none"
    },
    connectorActive: {
        '& $connectorLine': {
        },
    },
    connectorCompleted: {
        '& $connectorLine': {
        },
    },
    connectorDisabled: {
        '& $connectorLine': {
        },
    },
    connectorLine: {
        transition: theme.transitions.create('border-color'),
        borderColor: "#555",
        borderTopWidth: "5px",
        borderRadius: "10px"
    },
});

class PhaseIndicator extends React.Component {

    render() {
        const { classes, selectedPhase } = this.props;
        const connector = (
            <StepConnector
                className={"lm-step-connector"}
                classes={{
                    active: classes.connectorActive,
                    completed: classes.connectorCompleted,
                    disabled: classes.connectorDisabled,
                    line: classes.connectorLine,
                }}
            />
        );

        return (
            <Stepper
                nonLinear
                activeStep={selectedPhase}
                className={classes.stepper + " stepper-container"}
                connector={connector}>
                {playgroundIcons.map((icon, index) =>
                    <Step
                        key={index}
                        className={"lm-step"}
                        onClick={() => this.props.onSwitch(index)}>
                        <div
                            className={classes.icon}>
                            <div
                                style={{
                                    backgroundImage: `url(${icon.bg})`
                                }}
                                className={classNames(classes.iconBgImage, {
                                    [classes.active]: selectedPhase === index
                                })}>
                                <div
                                    style={{
                                        backgroundImage: `url(${icon.icon})`
                                    }}
                                    className={classes.iconImage}
                                />
                            </div>
                        </div>
                    </Step>
                )}
            </Stepper>
        );
    }
}

export default withStyles(styles)(PhaseIndicator);
