import React, { Component } from "react";
import Typography from "@material-ui/core/Typography/Typography";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import { withStyles } from "@material-ui/core";

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        margin: 0,
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 0,
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        boxShadow: '0px 5px 10px 0px rgba(98,98,98,0.1)',
        minHeight: '114px',
        transition: 'none',
        '&$expanded': {
            margin: 0,
            minHeight: '114px',
            backgroundColor: '#085ca6',
        },
    },
    content: {
        '&$expanded': {
            margin: '10px 0',
        },
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
    },
}))(MuiExpansionPanelDetails);

const StyledTypography = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '15px 0 15px 0 !important',
        flexDirection: 'column',
        fontSize: '16px',
        fontFamily: '"Montserrat"',
        alignItems: 'center',
        color: '#626262',
    },
})(Typography);

const StyledExpandedTypography = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '15px 0 15px 0 !important',
        flexDirection: 'column',
        fontSize: '16px',
        fontFamily: '"Montserrat"',
        alignItems: 'center',
        color: '#fff',
    },
})(Typography);

const Span = ({ classes }) => <span className={classes.expandingArrow} />;

const ExpandingArrow = withStyles({
    expandingArrow: {
        display: 'block',
        width: '15px',
        height: '15px',
        borderBottomLeftRadius: '3px',
        transform: 'rotate(-45deg)',
        position: 'absolute',
        boxShadow: '0px 5px 10px 0px rgba(98,98,98,0.1)',
        bottom: '-7px',
        left: 'calc(50% - 10px)',
        background: '#085ca6',
    }
})(Span);

class ExpansionPhase extends Component {
    handleChange = () => {
        this.props.onChange(this.props.title);
    };

    render() {
        const { children, title, icon, expandedIcon, expandedPhase } = this.props;
        const isExpanded = expandedPhase === title;

        return (
          <ExpansionPanel
            square
            expanded={isExpanded}
            onChange={this.handleChange}
          >
              <ExpansionPanelSummary>
                  {
                      isExpanded
                        ? <StyledExpandedTypography><img src={expandedIcon} alt="Icon" width="30" height="30" style={{ marginBottom: '6px' }} /> {title} <ExpandingArrow /></StyledExpandedTypography>
                        : <StyledTypography><img src={icon} alt="Icon" width="30" height="30" style={{ marginBottom: '6px' }} /> {title}</StyledTypography>
                  }
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                  {children}
              </ExpansionPanelDetails>
          </ExpansionPanel>
        );
    }
}

export default ExpansionPhase;