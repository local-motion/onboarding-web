import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
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
// core components
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { getUser } from "../../../components/UserProfile/UserProfileReducer";
import { isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";
import { getStatus } from "../../../misc/WorkspaceHelpers";


const mapStateToProps = state => ({
    user: getUser(state)
})


class SocialMedia extends React.Component {
    render() {
        const {user, playground} = this.props;
        const userIsVolunteer = isUserVolunteerOfPlayground(user, playground);
        const hrefArray = window.location.href.split('/');
        const shareUrl = window.location.href.replace(hrefArray[hrefArray.length - 1], '');
        const name = playground.name;
        const phase = getStatus(playground);

        var details = {
            title: `Help om ${name} rookvrij te maken!`,
            description: `Ik kom in actie om een speeltuin rookvrij te maken. De actie bevindt zich in de fase ${phase}. Help jij mij om ${name} rookvrij te maken? 
            ${shareUrl}`,
            via: "Longfonds Rookvrij Generatie.",
            hashtags: ['smokefree', 'nosmoking']
        };

        return (
            <div>
                <FacebookShareButton className="socialIcon" disabled={!userIsVolunteer} url={shareUrl} quote={details.description} hashtag={`#${details.hashtags[0]}`}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <LinkedinShareButton className="socialIcon" disabled={!userIsVolunteer} url={shareUrl} title={details.title} description={details.description}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <TwitterShareButton className="socialIcon" disabled={!userIsVolunteer} url={shareUrl} title={details.title} via={details.via} hastags={details.hashtags}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton className="socialIcon" disabled={!userIsVolunteer} url={shareUrl} title={details.title} seperator=" ">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <WorkplaceShareButton className="socialIcon" disabled={!userIsVolunteer} url={shareUrl} quote={details.title} hashtag={details.hashtags[0]} >
                    <WorkplaceIcon size={32} round />
                </WorkplaceShareButton>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(withTranslation("translations")(connect(mapStateToProps)(SocialMedia)));
