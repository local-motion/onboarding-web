/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import {List, ListItem, withStyles} from "@material-ui/core";
import { Link } from 'react-router-dom'
import footerStyle from "assets/jss/material-kit-react/components/footerStyle.jsx";
import {withTranslation} from 'react-i18next';

function Footer({ t, classes, whiteFont, onlyLogo, onlyLinks }) {
    const footerClasses = classNames({
        [classes.footer]: true,
        [classes.footerWhiteFont]: whiteFont
    });
    const aClasses = classNames({
        [classes.a]: true,
        [classes.footerWhiteFont]: whiteFont
    });
    return (
        <footer className={footerClasses + " footer"}>
            <div className={classes.container + " footer-container"}>
                <div className={classNames(classes.left, 'links-container', {
                    [classes.hide]: onlyLogo,
                    [classes.fullWidth]: onlyLinks,
                })}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <Link to="/over-ons" className={classes.block}>Over ons</Link>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <Link to="/gebruiksvoorwaarden" className={classes.block}>Gebruiksvoorwaarden</Link>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <Link to="/privacyverklaring" className={classes.block}>Privacyverklaring</Link>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <Link to="/veelgestelde-vragen" className={classes.block}>Veelgestelde vragen</Link>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <Link to="/contact" className={classes.block}>Contact</Link>
                        </ListItem>
                    </List>
                </div>
                <div className={classNames(classes.right, "logos-container", {
                    [classes.fullWidth]: onlyLogo,
                    [classes.hide]: onlyLinks,
                })}>
                    <List className={classes.list}>
                        {/*<ListItem className={classes.inlineBlock + " footer-logo"}>*/}
                            {/*<a*/}
                                {/*href="https://www.kwf.nl/"*/}
                                {/*className={classes.block}*/}
                                {/*target="_blank"*/}
                            {/*>*/}
                                {/*<img src={require("assets/img/logo-kwf.png")} alt="Logo KWF Kankerfonds" />*/}
                            {/*</a>*/}
                        {/*</ListItem>*/}
                        <ListItem className={classes.inlineBlock + " footer-logo"}>
                            <a
                                href="https://www.longfonds.nl/"
                                className={classes.logo}
                                target="_blank"
                            >
                                <img src={require("assets/img/logo-longfonds.png")} alt="Logo Longfonds" />
                            </a>
                            {/*<a*/}
                              {/*href="https://www.hartstichting.nl/"*/}
                              {/*className={classes.logo}*/}
                              {/*target="_blank"*/}
                            {/*>*/}
                                {/*<img src={require("assets/img/logo-hartstichting.png")} alt="Logo Hartstichting" />*/}
                            {/*</a>*/}
                        </ListItem>
                    </List>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    whiteFont: PropTypes.bool,
    onlyLogo: PropTypes.bool,
    onlyLinks: PropTypes.bool,
};

const translatedFooter = withTranslation("translations")(Footer)
export default withStyles(footerStyle)(translatedFooter);
