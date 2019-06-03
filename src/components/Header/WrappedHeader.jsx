import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "./Header";

const styles = (theme) => ({
    headerWrapper: {
        position: 'relative',
        marginBottom: 10,
    },
});

const WrappedHeader = ({ classes, customStyle, fullWidth = false }) => (
  <div className={`${classes.headerWrapper} ${customStyle || ''}`}>
      <Header fullWidth={fullWidth} />
  </div>
);

export default withStyles(styles)(WrappedHeader);