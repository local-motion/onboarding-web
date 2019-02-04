import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { withNamespaces } from "react-i18next";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


class About extends React.Component {

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
                        <h2>Over Rookvrij Spelen</h2>

Dit platform is een initiatief van het Longfonds en ABN AMRO. Met Rookvrij Spelen willen we je helpen om een speeltuin bij jou in de buurt rookvrij te maken. Dat doen we door je handige tools & tips aan te bieden. Door je in contact te brengen met het bestuur van de speeltuin én met buurtgenoten die je willen helpen.<br />
Hoe meer mensen een speeltuin rookvrij willen hebben, hoe groter de kans dat het bestuur van de speeltuinvereniging dit onderwerp op de agenda zet en hier mee aan de slag gaat.

<h3>Op weg naar een Rookvrije Generatie</h3>
Het rookvrij maken van speelplekken maakt deel uit van de beweging ‘op weg naar een Rookvrije Generatie’. Deze beweging is een gezamenlijk initiatief van het Longfonds, KWF Kankerbestrijding en de Hartstichting. In elke fase van het opgroeien willen we kinderen beschermen tegen tabaksrook en de verleiding om te gaan roken. Zodat ze opgroeien als een generatie die zélf kan en zal kiezen voor een gezonde, rookvrije toekomst.

<h3>Waarom is het zo belangrijk dat kinderen rookvrij kunnen spelen?</h3>
Iedereen wil dat kinderen spelen in een gezonde en veilige omgeving. Jonge longen zijn kwetsbaar. Zien roken, doet roken. Als kinderen anderen zien roken, lijkt dat normaal en misschien zelfs aantrekkelijk. Een rookvrije speeltuin geeft het goede voorbeeld aan kinderen.
<ul>
<li>Roken is de belangrijkste te voorkomen oorzaak van ziekte en sterfte in Nederland.</li>
<li>Roken is erg verslavend. Kinderen zijn extra gevoelig voor verslaving: hoe jonger je begint met roken, hoe lastiger het is om te stoppen.</li>
<li>Roken begint vaak op jonge leeftijd. Twee derde van rokers is begonnen voor zijn 18e.</li>
<li>Iedere week raken honderden kinderen verslaafd aan roken.</li>
</ul>
<b>Wil je dat kinderen rookvrij kunnen spelen? Zet dan hier de eerste stap!</b>

                    </GridItem>
                  </GridContainer>
                </div>
                <Footer />
            </div>
    );
  }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(About)
);
