import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withTranslation } from "react-i18next";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import TermsText from "./TermsText";
import BackButton from "../../components/BackButton/BackButton";
import WrappedHeader from "../../components/Header/WrappedHeader";


const Terms = ({ classes }) => (
  <div className={classes.wrapper}>
      <WrappedHeader customStyle={classes.customWrappedHeader}/>

      <div className={classes.container}>
          <BackButton className={classes.backButton}/>

          <div className={classes.mainDown}>
              <TermsText/>
          </div>

      </div>

      <Footer/>
  </div>
);

export default withStyles(componentsStyle)(
  withTranslation("translations")(Terms)
);
