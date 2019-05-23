import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { withTranslation } from "react-i18next";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import TermsText from "./TermsText";
import BackButton from "../../components/BackButton/BackButton";
import { titlePrefix } from "../../misc/WorkspaceHelpers";
import { Helmet } from "react-helmet";

class Terms extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.container}>
          <Helmet>
              <title>{titlePrefix} | Gebruiksvoorwaarden Platform RookvrijSpelen.nl</title>
          </Helmet>
          <Header
            brand={"Rookvrije generatie"}
            rightLinks={<HeaderLinks/>}
            fixed
            color="white"
            changeColorOnScroll={{
                height: 50,
                color: "white"
            }}
            {...rest}
          />
          <BackButton className={classes.backButton}/>

          <div className={classes.mainDown}>
              <TermsText/>
          </div>
          <Footer/>
      </div>
    );
  }
}

export default withStyles(componentsStyle)(
  withTranslation("translations")(Terms)
);
