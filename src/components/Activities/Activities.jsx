import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";
import { connect } from "react-redux";
import { getIntegralAuditTrail } from "components/AuditTrail/AuditTrailReducer";
import { getPrettyHybridMessageDatetime } from "utils/DateTimeUtils";
import { getAllPlaygrounds } from "components/Playground/PlaygroundReducer";


const mapStateToProps = (state, ownProps) => ({
    // user: getUser(state),
    playgrounds: getAllPlaygrounds(state),
    auditTrail: getIntegralAuditTrail(state, 20),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});



const styles = theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        paddingTop: 20,
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        marginBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'dk_black_bamboo-webfont',
        fontSize: 26,
        color: '#626262',
    },
    icon: {
        marginRight: 7,
        fill: '#626262',
    },
    activity: {
        border: '1px solid #c5e3f5',
        borderRadius: 5,
        padding: 15,
        margin: '5px 0',
        width: '100%',
    },
    time: {
        fontSize: 12,
        color: '#085ca6',
        lineHeight: 2,
    },
    message: {
        fontSize: 15,
        color: '#626262',
        lineHeight: 1.2,
    },
    highlighted: {
        color: '#085ca6',
    },
});

class Activities extends Component {

    getMessageForEventType = record => {
        const {classes} = this.props
        switch (record.eventType) {
            case 'INITIATIVE_JOINED':
                return record.actorName + ' doet lekker mee'
            case 'CHECKBOX_UPDATE':
                const playground = this.props.playgrounds.find(playground => playground.id === record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft een checkbox aangevinkt in <span className={classes.highlighted}>{playground.name}</span></Fragment>
                // return record.actorName + ' heeft een checkbox aangevinkt'
            default:
                return 'Niet te melden'
        }
    }
    

    render() {
        const { auditTrail, classes } = this.props;

        return (
          <div className={classes.wrapper}>
              <div className={classes.header}>
                  <AccessTime className={classes.icon} />
                  <div className={classes.title}>Activiteit</div>
              </div>

              { auditTrail.map((record, idx) =>
                <div className={classes.activity} key={idx} >
                        <div className={classes.time}>{getPrettyHybridMessageDatetime(record.instant)}</div>
                        <div className={classes.message}>{this.getMessageForEventType(record)}</div>
                </div>
            
                )}

          </div>
        );
    }
}



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Activities));
