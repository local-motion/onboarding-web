import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import playgroundIconsStyle from "assets/jss/material-kit-react/components/playgroundIconsStyle.jsx";

const playgroundIcons = [
    {
        bg: require('assets/img/texture-1@2x.png'),
        icon: require('assets/img/icon-cooperate@2x.png'),
        title: 'Voorbereiden',
        text: '15 teamleden in uw buurt zijn bezig met het voorbereiden van het rookvrij maken van de lineushof. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        bg: require('assets/img/texture-2@2x.png'),
        icon: require('assets/img/icon-checklist@2x.png'),
        title: 'Invoeren',
        text: 'Nadat de voorbereiding is getroffen wordt de verandering ingevoerd. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        bg: require('assets/img/texture-3@2x.png'),
        icon: require('assets/img/icon-positivity@2x.png'),
        title: 'Naleven',
        text: 'Wanneer de speeltuin rookvrij is, is het belangrijk om het besluit na te leven. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
]

class PlaygroundIcons extends React.PureComponent {

    renderIcon(icon) {
        const { classes } = this.props;

        return (
            <a className={classes.icon} key={icon.title}>
                <div
                    style={{
                        backgroundImage: `url(${icon.bg})`
                    }}
                    className={classes.iconBgImage}>
                    <div
                        style={{
                            backgroundImage: `url(${icon.icon})`
                        }}
                        className={classes.iconImage}
                    />
                </div>
                <div className={classes.iconTitle}>{icon.title}</div>
                <div className={classes.iconText}>{icon.text}</div>
            </a>
        );
    }

    render() {
        return playgroundIcons.map(icon => this.renderIcon(icon));
    }
}


export default withStyles(playgroundIconsStyle)(PlaygroundIcons);
