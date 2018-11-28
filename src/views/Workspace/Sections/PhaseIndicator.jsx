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
    },
    completed: {
        display: 'inline-block',
    },
    stepper: {
        background: "none"
    },
    connectorActive: {
        '& $connectorLine': {
            borderColor: theme.palette.secondary.main,
        },
    },
    connectorCompleted: {
        '& $connectorLine': {
            borderColor: theme.palette.primary.main,
        },
    },
    connectorDisabled: {
        '& $connectorLine': {
            borderColor: theme.palette.grey[100],
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
    return ['1', '2', '3'];
}

class PhaseIndicator extends React.Component {
    state = {
        activeStep: 0,
        completed: {},
    };


    render() {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
        const connector = (
            <StepConnector
                classes={{
                    active: classes.connectorActive,
                    completed: classes.connectorCompleted,
                    disabled: classes.connectorDisabled,
                    line: classes.connectorLine,
                }}
            />
        );

        return (
            <Stepper nonLinear activeStep={activeStep} className={classes.stepper} connector={connector}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label} className={"lm-step"}>

                            <StepButton className={this.state.activeStep === index ? "active lm-step-button" : "inactive lm-step-button"}
                                        completed={this.state.completed[index]}
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
