import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import {
    FacebookShareButton,
    FacebookIcon,
    GooglePlusShareButton,
    GooglePlusIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    WorkplaceShareButton,
    WorkplaceIcon
} from 'react-share';
// core components
import { withNamespaces } from "react-i18next";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class SocialMedia extends React.Component {
    render() {
        const shareUrl = window.location;
        var details = {
            title: `Help make ${this.props.playground.name} smoke free.`,
            description: `I've joined the campaign to help make ${this.props.playground.name} smoke free.`,
            via: "Longfonds Rookvrij Generatie.",
            hashtags: ['smokefree', 'nosmoking']
        };

        return (
            <div>
                <FacebookShareButton className="socialIcon" url={shareUrl} quote={details.description} hashtag={details.hashtags[0]}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <GooglePlusShareButton className="socialIcon" url={shareUrl}>
                    <GooglePlusIcon size={32} round />
                </GooglePlusShareButton>

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
        );
    }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(SocialMedia)
);
