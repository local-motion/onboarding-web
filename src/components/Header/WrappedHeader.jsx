import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "./Header";

const styles = (theme) => ({
    headerWrapper: {
        position: 'relative',
        marginBottom: 10,
    },
});

const WrappedHeader = ({ classes, customStyle, fullWidth = false, actieItems, playground, phases, startPathUrl }) => (
  <div className={`${classes.headerWrapper} ${customStyle || ''}`}>
      <Header
        fullWidth={fullWidth}
        actieItems={actieItems}
        playground={playground}
        phases={phases}
        startPathUrl={startPathUrl}
      />
  </div>
);

export default withStyles(styles)(WrappedHeader);