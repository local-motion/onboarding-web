import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import {withTranslation} from "react-i18next";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom'
import BackButton from "../../components/BackButton/BackButton";

class FAQ extends React.Component {

    render() {
        const {classes, ...rest} = this.props;
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

                <div style={{background: "transparent", marginTop: "100px"}}>
                    <GridContainer className={"grid-container"}>
                        <GridItem xs={12} sm={12} md={6} className={classes.container}>
                            <h2>Veelgestelde vragen</h2>
                            Hieronder een antwoord op veelgestelde vragen. Staat jouw vraag er niet bij, stuur ons dan gerust een <Link to='/contact'>berichtje</Link>.
                            <br/> <br/>
                            <div className={"faq-container"}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.heading}>Waarom dit platform "Rookvrij Spelen"?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                        Met Rookvrij Spelen willen we je helpen om een speeltuin bij jou in de buurt rookvrij te maken. Dat doen we door je handige tools & tips aan te bieden. Door je in contact te brengen met het bestuur van de speeltuin én met buurtgenoten die je willen helpen.<br />
                                        Hoe meer mensen een speeltuin rookvrij willen hebben, hoe groter de kans dat het bestuur van de speeltuinvereniging dit onderwerp op de agenda zet en hier ook écht mee aan de slag gaat. 
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.heading}>Waarom is Rookvrij Spelen nodig?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography component='span'>
                                        Hoe meer rookvrije speelplekken hoe beter. Een rookvrije speeltuin geeft het goede voorbeeld aan kinderen en dat is belangrijk:
                                        <ul>
                                            <li>Jonge longen zijn kwetsbaar. Zien roken, doet roken.</li>
                                            <li>Als kinderen anderen zien roken, lijkt dat normaal en misschien zelfs aantrekkelijk.</li>
                                            <li>Roken is de belangrijkste te voorkomen oorzaak van ziekte en sterfte in Nederland.</li>
                                            <li>Roken is erg verslavend. Kinderen zijn extra gevoelig voor verslaving: hoe jonger je begint met roken, hoe lastiger het is om te stoppen.</li>
                                            <li>Roken begint vaak op jonge leeftijd. Twee derde van rokers is begonnen voor zijn 18e.</li>
                                            <li>Iedere week raken honderden kinderen verslaafd aan roken.</li>
                                        </ul>
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.heading}>Wie zitten er achter Rookvrij Spelen?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                        Dit platform is een initiatief van het Longfonds en ABN AMRO.<br />
                                        Het rookvrij maken van speelplekken maakt onderdeel uit van de beweging ‘<a href='https://rookvrijegeneratie.nl'>op weg naar een Rookvrije Generatie</a>’. Deze beweging is een gezamenlijk initiatief van het Longfonds, KWF Kankerbestrijding en de Hartstichting. Het doel: ieder kind dat geboren wordt, moet de kans krijgen om volledig rookvrij op te groeien.  Inmiddels hebben al veel partijen zich aangesloten bij de Rookvrije Generatie: speeltuinen, maar ook sportverenigingen, scholen, bedrijven, gemeenten en zorginstellingen. Ook de overgrote meerderheid van de Nederlanders steunt het doel van de Rookvrije Generatie.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.heading}>Waarom is ABN AMRO hierbij betrokken?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                        - nog in te vullen -
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.heading}>Waarom moet ik zelf in actie komen, dit is toch een taak van de overheid?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                        Kinderen rookvrij laten spelen, gaat alleen lukken als we het samen doen. Dus de gezondheidsfondsen, de overheden, de verenigingen, de zorginstellingen, jonge ouders, grootouders etc. Kortom, alle Nederlanders. Er is al veel gebeurd, maar er moet ook nog veel gebeuren om kinderen rookvrij te laten opgroeien.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.heading}>Hoe zit het met mijn privacy?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                        Jouw privacy vinden we heel belangrijk. We gaan daarom zorgvuldig om met je (persoons)gegevens. 
                                        Gegevens zijn veilig opgeslagen en worden niet gedeeld met derden. 
                                        Lees hier meer over in onze <Link to='/privacyverklaring'>privacyverklaring</Link>.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withTranslation("translations")(FAQ)
);
