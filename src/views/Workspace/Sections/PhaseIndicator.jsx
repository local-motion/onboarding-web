import React from "react";
//import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core/StepConnector';

const styles = theme => ({
    button: {
        marginRight: theme.spacing.unit,
        bgColor: 'red',
        color: 'black',

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
        borderTopWidth: "10px",
        borderRadius: "10px"
    },
});

function getSteps() {
    return ['Voorbereiding', 'Uitvoering', 'Onderhouden'];
}

class PhaseIndicator extends React.Component {

    render() {
        const {classes, selectedPhase, activePhase} = this.props;
        const steps = getSteps();
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
            <Stepper nonLinear activeStep={selectedPhase} className={classes.stepper + " stepper-container"} connector={connector}>
                {steps.map((label, index) => {
                    return (
                        <Step key={index} className={"lm-step"} onClick={() => this.props.onSwitch(index)}>
                            <StepButton
                                className=  {   (activePhase    === index ? "active " : "inactive " ) +
                                                (selectedPhase  === index ? "selected " : ""        ) +
                                                "lm-step-button"
                                            }
                                disableTouchRipple
                            >
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
        );
    }
}

export default withStyles(styles)(PhaseIndicator);
