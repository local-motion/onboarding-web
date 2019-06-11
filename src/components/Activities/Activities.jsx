import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";
import { connect } from "react-redux";
import { getIntegralAuditTrail } from "components/AuditTrail/AuditTrailReducer";
import { getPrettyHybridMessageDatetime } from "utils/DateTimeUtils";
import { getAllPlaygrounds, getPlayground } from "components/Playground/PlaygroundReducer";


const mapStateToProps = (state, ownProps) => ({
    // user: getUser(state),
    playgrounds: getAllPlaygrounds(state),
    getPlayground: initiativeId => getPlayground(state, initiativeId),
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

const dateDisplayOptions = { weekday: 'long', month: 'long', day: 'numeric' };

export const formatDate = date => {
    // convert the graphQL date object to the format: "2019-04-03T18:28:20.437Z"
    const dateTimeString = date.year  + '-' + (date.month < 10 ? '0' : 0) + date.month + '-' + (date.day < 10 ? '0' : 0) + date.day + "T00:00:00.000Z"
    return new Date(dateTimeString).toLocaleDateString('nl-NL', dateDisplayOptions)
}

class Activities extends Component {

    getMessageForEventType = record => {
        const {classes} = this.props
        let playground = null

        switch (record.eventType) {
    // Initiative events
            case 'INITIATIVE_JOINED':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft zich aangesloten bij <span className={classes.highlighted}>{playground.name}</span></Fragment>
            case 'CHECKLIST_UPDATE':
                playground = this.props.getPlayground(record.initiativeId)
                const playgroundName = <span className={classes.highlighted}>{playground.name}</span>
                const checklistCheckedMessages = {
                    invite_manager: <Fragment> heeft de aankondiging in de pers gedaan dat {playgroundName} rookvrij is</Fragment>,
                    order_flyers: <Fragment> heeft de flyers besteld voor {playgroundName}</Fragment>,
                    distribute_flyers: <Fragment> heeft de flyers verspreid voor {playgroundName}</Fragment>,
                    press_announcement: <Fragment> heeft de aankondiging in de pers gedaan dat {playgroundName} rookvrij wordt</Fragment>,
                    newsletter_announcement: <Fragment> heeft de aankondiging in de nieuwsbrief gedaan dat {playgroundName} rookvrij wordt</Fragment>,
                    website_announcement: <Fragment> heeft de aankondiging op de website van {playgroundName} gedaan dat zij rookvrij wordt</Fragment>,
                    adjust_regulations: <Fragment> heeft de statuten van {playgroundName} aangepast</Fragment>,
                    publish_regulations: <Fragment> heeft de statuten van {playgroundName} gepubliceerd</Fragment>,
                    order_sign: <Fragment> heeft het rookvrij-bord voor {playgroundName} besteld</Fragment>,
                    place_sign: <Fragment> heeft het rookvrij-bord bij {playgroundName} opgehangen</Fragment>,
                    press_announcement_smokefree: <Fragment> heeft de aankondiging in de pers gedaan dat {playgroundName} rookvrij is</Fragment>,
                }
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span>{checklistCheckedMessages[record.checklistItem]}</Fragment>


    // User events
            case 'USER_CREATED':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft zich aangemeld voor rookvrijspelen</Fragment>
            case 'USER_DELETED':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft zich afgemeld voor rookvrijspelen</Fragment>
            case 'USER_REVIVED':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft zich opnieuw aangemeld voor rookvrijspelen</Fragment>
            case 'NOTIFICATION_SETTINGS_UPDATED':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft zijn notificaties {record.notificationLevel === 'FULL' ? 'aangezet' : 'uitgezet'}</Fragment>

    // Playground events
            case 'PLAYGROUND_CREATED':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft speeltuin <span className={classes.highlighted}>{playground.name}</span> aangemaakt</Fragment>
            case 'SMOKEFREE_DECISION':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft besloten dat <span className={classes.highlighted}>{playground.name}</span>{record.willBecomeSmokefree ? '' : ' niet'} rookvrij wordt</Fragment>
            case 'SMOKEFREE_DATE_COMMITTED':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft aangegeven dat <span className={classes.highlighted}>{playground.name}</span> op {record.smokeFreeDate} rookvrij wordt</Fragment>
            case 'MANAGER_JOINED_INITIATIVE':
                playground = this.props.getPlayground(record.initiativeId)
                return <Fragment><span className={classes.highlighted}>{record.actorName}</span> heeft zich aangemeld als beheerder van <span className={classes.highlighted}>{playground.name}</span></Fragment>
            case 'PLAYGROUND_OBSERVATION':
                playground = this.props.getPlayground(record.initiativeId)
                return record.smokefree ? 
                    <Fragment><span className={classes.highlighted}>{record.observerName}</span> zag dat <span className={classes.highlighted}>{playground.name}</span> rookvrij was op {formatDate(record.observationDate)}</Fragment>
                    :
                    <Fragment><span className={classes.highlighted}>{record.observerName}</span> zag  op {formatDate(record.observationDate)} iemand roken in <span className={classes.highlighted}>{playground.name}</span></Fragment>

            default:
                return null
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

              { auditTrail.map((record, idx) => {
                  const message = this.getMessageForEventType(record)
                  return message &&
                    <div className={classes.activity} key={idx} >
                            <div className={classes.time}>{getPrettyHybridMessageDatetime(record.instant)}</div>
                            <div className={classes.message}>{message}</div>
                    </div>
              }
                )}

          </div>
        );
    }
}



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Activities));
