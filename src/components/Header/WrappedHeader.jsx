import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "./Header";

const styles = theme => ({
    headerWrapper: {
        position: 'relative',

        '&:before': {
            content: '""',
            position: 'absolute',
            background: `url(${require('../../assets/img/landing/footer-base.jpg')}) repeat-x top`,
            backgroundSize: 'cover',
            transform: 'rotate(180deg)',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        padding: '15px 0 120px',
    },
});

const WrappedHeader = ({ classes, customStyle }) => (
  <div className={`${classes.headerWrapper} ${customStyle}`}>
      <Header />
  </div>
);

export default withStyles(styles)(WrappedHeader);