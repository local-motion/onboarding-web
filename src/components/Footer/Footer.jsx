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
        <footer className={footerClasses}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="https://localmotion.community"
                                className={classes.block}
                                target="_blank"
                            >
                                Local Motion
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="https://localmotion.community/presentation"
                                className={classes.block}
                                target="_blank"
                            >
                                About us
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="https://www.longfonds.nl/rookvrije-generatie"
                                className={classes.block}
                                target="_blank"
                            >
                                Smoke-free generation
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a
                                href="https://www.creative-tim.com/license"
                                className={classes.block}
                                target="_blank"
                            >
                                Licenses
                            </a>
                        </ListItem>
                    </List>
                </div>
                <div className={classes.right}>
                    {t('footer.attribution')}
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
