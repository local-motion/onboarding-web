/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import {List, ListItem, withStyles} from "@material-ui/core";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import footerStyle from "assets/jss/material-kit-react/components/footerStyle.jsx";

import {withNamespaces} from 'react-i18next';

function Footer({...props}) {
    const {t, classes, whiteFont} = props;
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
                <div className={classes.left + " links-container"}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="/about"
                                className={classes.block}
                            >
                                Wie zijn wij
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="/terms"
                                className={classes.block}
                            >
                                Algemene voorwaarden
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="/privacy"
                                className={classes.block}
                            >
                                Privacy statement
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="/contact"
                                className={classes.block}
                            >
                                Contact
                            </a>
                        </ListItem>
                    </List>
                </div>
                <div className={classes.right + " logos-container"}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock + " footer-logo"}>
                            <a
                                href="https://www.hartstichting.nl/"
                                className={classes.block}
                                target="_blank"
                            >
                                <img src={require("assets/img/logo-hartstichting.png")} alt="Logo Hartstichting" />
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock + " footer-logo"}>
                            <a
                                href="https://www.kwf.nl/"
                                className={classes.block}
                                target="_blank"
                            >
                                <img src={require("assets/img/logo-kwf.png")} alt="Logo KWF Kankerfonds" />
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock + " footer-logo"}>
                            <a
                                href="https://www.longfonds.nl/"
                                className={classes.block}
                                target="_blank"
                            >
                                <img src={require("assets/img/logo-longfonds.png")} alt="Logo Longfonds" />
                            </a>
                        </ListItem>
                    </List>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    whiteFont: PropTypes.bool
};

const translatedFooter = withNamespaces("translations")(Footer)
export default withStyles(footerStyle)(translatedFooter);
