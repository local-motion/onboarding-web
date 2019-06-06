import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withTranslation } from "react-i18next";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PrivacyText from "./PrivacyText";
import BackButton from "../../components/BackButton/BackButton";
import WrappedHeader from "../../components/Header/WrappedHeader";
import { titlePrefix } from "../../misc/WorkspaceHelpers";
import { Helmet } from "react-helmet";


const Privacy = ({ classes }) => (
  <div className={classes.wrapper}>
      <Helmet>
          <title>{titlePrefix} | Privacyverklaring</title>
      </Helmet>

      <WrappedHeader fullWidth customStyle={classes.customWrappedHeader}/>

      <div className={classes.container}>
          <BackButton className={classes.backButton}/>

          <div className={classes.mainDown}>
              <PrivacyText/>
          </div>
      </div>

      <Footer fullWidth />
  </div>
);

export default withStyles(componentsStyle)(
  withTranslation("translations")(Privacy)
);
