import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import componentsStyle from "../../assets/jss/material-kit-react/views/components";

const PrivacyText = ({ classes }) => {
    return (
        <GridContainer className={"grid-container"}>
            <GridItem xs={12} sm={12} md={6} className={classes.container}>
                <h2>Privacyverklaring</h2>
                Deze website www.rookvrijspelen.nl is een initiatief van Longfonds en ABN AMRO. Het Longfonds en ABN AMRO respecteren jouw privacy en stellen alles in het werk deze te beschermen. Deze privacyverklaring stelt jou op de hoogte hoe wij omgaan met je gegevens.

                Als je gebruik maakt van de website rookvrijspelen.nl verwerken wij mogelijk gegevens over jou (persoonsgegevens). Persoonsgegevens worden met de grootst mogelijke zorgvuldigheid behandeld en beveiligd. Uitgangspunt bij het verwerken van jouw persoonsgegevens is dat er niet meer persoonsgegevens worden verzameld dan noodzakelijk is.
                Zowel het Longfonds (Stationsplein 127, te Amersfoort) als ABN AMRO (Gustav Mahlerlaan 10) zijn verantwoordelijk voor de gegevensverwerking. Wij kunnen dit privacy statement van tijd tot tijd aanpassen.

                <h3>Verwerking persoonsgegevens</h3>
                In dit privacy statement lichten wij, aan de hand van de verschillende manieren waarop wij persoonsgegevens verkrijgen, toe welke gegevens wij verzamelen en voor welke doeleinden wij deze gegevens gebruiken.

                <h3>Persoonsgegevens</h3>
                Afhankelijk van de diensten en functies die je op onze website gebruikt, kunnen wij de volgende persoonsgegevens van jou verwerken:

                <ul>
                    <li>Voorletters, voor- en achternaam</li>
                    <li>Geslacht</li>
                    <li>Adresgegevens</li>
                    <li>Telefoonnummer</li>
                    <li>E-mailadres</li>
                    <li>Locatiegegevens</li>
                    <li>Geboortedatum</li>
                    <li>Klik- en surfgedrag via cookies en vergelijkbare technieken</li>
                </ul>

                We gebruiken jouw gegevens alleen in relatie tot het Platform.  We verwerken die gegevens om:
                <ul>
                    <li>Je toegang te verschaffen tot het Platform en het gebruik van het Platform (inclusief alle functionaliteiten) mogelijk te maken; en</li>
                    <li>Je op verzoek informatie en producten te sturen;</li>
                    <li>De werking van het Platform te verbeteren;</li>
                    <li>Te bepalen of je in lijn met de Gebruiksvoorwaarden het Platform gebruikt.</li>
                </ul>

                <h3>Cookies</h3>
                We maken gebruik van cookies en scripts voor een betere werking van de website.
                Een cookie is een databestand dat een website op de harde schijf van uw computer zet, wanneer u deze website bezoekt. Een cookie-bestand kan informatie bevatten, zoals een gebruikers-identificatie code, die de website gebruikt om de pagina’s die u bezoekt te traceren.
                Het Longfonds en ABN AMRO maken gebruik van cookies om het gebruik van de website technisch mogelijk te maken en te analyseren.

                <h4>Lijst met analytische cookies rookvrijspelen.nl</h4>
                <ul>
                    <li>Google Analytics</li>
                </ul>

                <h3>Verstrekking aan derden</h3>
                <h4>Verstrekken van persoonsgegevens</h4>
                Wij verstrekken persoonsgegevens uitsluitend aan derden en alleen als dit nodig is voor de uitvoering van onze overeenkomst met jou of om te voldoen aan een wettelijke verplichting. Een voorbeeld van het delen van persoonsgegevens met derden is het verstrekken van adresgegevens aan een postverwerker om post te kunnen sturen.
                Met derden die in opdracht van ons jouw persoonsgegevens verwerken, zogenaamde verwerkers, sluiten wij een verwerkersovereenkomst af. Zo zorgen wij dat onze verwerkers een zelfde niveau van beveiliging en vertrouwelijkheid van persoonsgegevens hanteren als wij zelf.

                <h3>Bewaartermijn</h3>
                Je persoonsgegevens worden niet langer bewaard dan nodig. Ons streven is om persoonsgegevens te vernietigen zodra we deze niet meer nodig hebben om onze doelen te realiseren. Sommige gegevens worden bewaard omdat het op grond van een financiële en/of fiscale verplichting nodig is. In dat geval worden je gegevens zeven jaar bewaard. Na afloop van deze termijn zorgen wij ervoor dat je persoonsgegevens op zorgvuldige wijze worden verwijderd.  Verder worden alle persoonsgegevens die we niet langer nodig hebben vernietigd zodra jij je account verwijdert.

                <h3>Gegevens inzien, aanpassen of vergeten worden</h3>
                Je hebt het recht een verzoek te doen om je persoonsgegevens in te zien, te corrigeren of vergeten te worden. Daarnaast heb je het recht om eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens door ons. Ook heb je in bepaalde gevallen het recht op gegevensoverdraagbaarheid. Dat betekent dat je bij ons een verzoek kunt indienen om de persoonsgegevens die wij van jou bewaren in een computerbestand naar jou of een ander, of een door jou genoemde organisatie te sturen.
                Je kunt een verzoek tot inzage, correctie, vergetelheid en/of gegevensoverdraging van jouw persoonsgegevens of verzoek tot intrekking van jouw toestemming of bezwaar op de verwerking van jouw persoonsgegevens sturen naar privacy@longfonds.nl.

                <h3>Contact</h3>
                Voor vragen of opmerkingen aangaande het privacy statement kun je contact opnemen via privacy@longfonds.nl. Ook kun je contact opnemen met de Functionaris Gegevensbescherming van ABN AMRO via privacy.office@nl.abnamro.com


            </GridItem>
        </GridContainer>
    );
};

export default withStyles(componentsStyle)(PrivacyText);