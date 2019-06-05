import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    WorkplaceShareButton,
    WorkplaceIcon
} from 'react-share';
import { connect } from 'react-redux'
import { withTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { getUser } from "../../../components/UserProfile/UserProfileReducer";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { getStatus } from "../../../misc/WorkspaceHelpers";


const mapStateToProps = state => ({
    user: getUser(state)
});

const styles = theme => ({
    button: {
        marginTop: 20,
        marginBottom: 5,
    },
    popup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '35px !important',
        flexDirection: 'column',
        maxWidth: 360,

        [theme.breakpoints.down('xs')]: {
            maxWidth: 280,
        },
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: '#085ca6',
        marginBottom: 20,

        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});


const SocialMedia = ({ user, playground, classes }) => {
    const [isOpen, togglePopup] = useState(false);
    const openPopup = () => togglePopup(true);
    const closePopup = () => togglePopup(false);

    const userIsVolunteer = isUserVolunteerOfPlayground(user, playground);
    const hrefArray = window.location.href.split('/');
    const shareUrl = window.location.href.replace(hrefArray[hrefArray.length - 1], '');
    const name = playground.name;
    const phase = getStatus(playground);

    const details = {
        title: `Help make ${name} smoke free.`,
        description: `Ik kom in actie om een speeltuin rookvrij te maken. De actie bevindt zich in de fase ${phase}. Help jij mij om ${name} rookvrij te maken? 
        ${shareUrl}`,
        via: "Longfonds Rookvrij Generatie.",
        hashtags: ['smokefree', 'nosmoking']
    };

    return (
        <div>
            <Button
              className={classes.button}
              onClick={openPopup}
              disabled={!userIsVolunteer}
              variant="contained"
              color="primary"
            >Deel en laat anderen ook in actie komen</Button>

            <Dialog
              open={isOpen}
              onClose={closePopup}
            >
                <DialogContent className={classes.popup}>
                    <Typography component="p" className={classes.title}>Deel en laat anderen ook tekenen voor het rookvrij krijgen van alle speelplekken in jouw plaats.</Typography>

                    <div className={classes.buttons}>
                        <FacebookShareButton className="socialIcon" url={shareUrl} quote={details.description} hashtag={`#${details.hashtags[0]}`}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <LinkedinShareButton className="socialIcon" url={shareUrl} title={details.title} description={details.description}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>

                        <TwitterShareButton className="socialIcon" url={shareUrl} title={details.title} via={details.via} hastags={details.hashtags}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>

                        <WhatsappShareButton className="socialIcon" url={shareUrl} title={details.title} seperator=" ">
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>

                        <WorkplaceShareButton className="socialIcon" url={shareUrl} quote={details.title} hashtag={details.hashtags[0]} >
                            <WorkplaceIcon size={32} round />
                        </WorkplaceShareButton>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(withTranslation("translations")(connect(mapStateToProps)(SocialMedia)));
