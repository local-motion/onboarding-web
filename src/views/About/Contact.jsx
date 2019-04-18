import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { withTranslation } from "react-i18next";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "@material-ui/core/Button/Button";
import BackButton from "../../components/BackButton/BackButton";


class Contact extends React.Component {

    render() {
    const { classes, ...rest } = this.props;
        return (
            <div className={classes.container}>

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

                <BackButton className={classes.backButton} />

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
                <Footer />
            </div>
    );
  }
}

export default withStyles(componentsStyle)(
    withTranslation("translations")(Contact)
);
