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
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { history } from "../../setup";
import { readCookie, createCookie } from "../../utils/CookieUtils";


const showWelcomPageCookieName = 'showwelcomepage'

export const  isShowWelcomePage = () => !(readCookie(showWelcomPageCookieName)) || readCookie(showWelcomPageCookieName) === 'true'


class Welcome extends React.Component {

    state = {
      showWelcomePage: isShowWelcomePage()
    }

    toggleShowWelcomePage() {
      this.setState(state => {
        const newValue = state.showWelcomePage ? 'false' : 'true'
        createCookie(showWelcomPageCookieName, newValue)
        return {showWelcomePage: !state.showWelcomePage}
      })
    }

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

                <div className={classes.mainDown}>
                  <GridContainer className={"grid-container"}>
                    <GridItem xs={12} sm={12} md={6} className={classes.container}>
                        <h2>Welkom bij Rookvrij Spelen</h2>

Wij willen alle speeltuinen in Nederland rookvrij maken. Zo geven we onze kinderen de gelegenheid om rookvrij op te groeien en een gezond leven te leiden.

We hebben jouw hulp nodig om dit mogelijk te maken. Op dit platform kun je ...
                        <br/><br/>

                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={!isShowWelcomePage()} 
                                    onChange={() => this.toggleShowWelcomePage()}
                                />
                            }
                            label="Deze pagina niet meer tonen" 
                        />

                        <br />
                        <Button variant="contained" size="small" color="primary" 
                          onClick={() => history.push('/')}
                        >
                          Door naar de kaart
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
    withTranslation("translations")(Welcome)
);
