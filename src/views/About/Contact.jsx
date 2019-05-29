import React from "react";
import { withTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";

import { titlePrefix } from "../../misc/WorkspaceHelpers";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import BackButton from "../../components/BackButton/BackButton";
import WrappedHeader from "../../components/Header/WrappedHeader";


const Contact = ({ classes }) => (
  <div className={classes.wrapper}>
      <Helmet>
          <title>{titlePrefix} | Contact</title>
      </Helmet>

      <WrappedHeader customStyle={classes.customWrappedHeader}/>

      <div className={classes.container}>

          <BackButton className={classes.backButton}/>

          <div className={classes.mainDown}>
              <GridContainer className={"grid-container"}>
                  <GridItem xs={12} sm={12} md={6} className={classes.container}>
                      <h2>Contact</h2>
                      Heb je vragen, ideeën of klachten? Neem gerust contact met ons op.
                      <br/><br/><br/>
                      <Button size="large"
                              color="primary"
                              className="btn btn-highlight"
                              href={"mailto:service@longfonds.nl?subject=Ik%20heb%20een%20vraag"}
                      >
                          Neem contact op
                      </Button>
                  </GridItem>
              </GridContainer>
          </div>
      </div>
      <Footer/>
  </div>
);

export default withStyles(componentsStyle)(
  withTranslation("translations")(Contact)
);
