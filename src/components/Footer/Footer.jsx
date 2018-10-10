/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import footerStyle from "assets/jss/material-kit-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
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
          Made with{" "}
          <Favorite className={classes.icon} /> by{" "}
          <a
            href="https://www.abnamro.nl"
            className={aClasses}
            target="_blank"
          >
            ABN Amro
          </a>{", "}
          <a
            href="http://www.longfonds.nl"
            className={aClasses}
            target="_blank"
          >
            Longfonds
          </a>{" and "}
          <a
            href="http://www.forus.io"
            className={aClasses}
            target="_blank"
          >
            Forus
          </a>{" "}
          &copy; {1900 + new Date().getYear()}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
