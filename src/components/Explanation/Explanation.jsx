/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import explanationStyle from "./ExplanationStyle.jsx";
import { withTranslation } from 'react-i18next';
import { withStyles } from "@material-ui/core";

const Explanation = ({ t, classes = {} }) => {
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.flex}>
                    <div className={classes.left}>
                        <a
                            href="https://www.hartstichting.nl/"
                            className={classes.link}
                            target="_blank">
                            <img
                                className={classes.image}
                                src={require("assets/img/logo-hartstichting.png")}
                                alt="Logo Hartstichting"
                            />
                        </a>
                        <a
                            href="https://www.longfonds.nl/"
                            className={classes.link}
                            target="_blank">
                            <img
                                className={classes.image}
                                src={require("assets/img/logo-longfonds.png")}
                                alt="Logo Longfonds"
                            />
                        </a>
                        <a
                            href="https://www.kwf.nl/"
                            className={classes.link}
                            target="_blank">
                            <img
                                className={classes.image}
                                src={require("assets/img/logo-kwf.png")}
                                alt="Logo KWF Kankerfonds"
                            />
                        </a>
                    </div>
                    <div className={classes.right}>
                        <p className={classes.text}>
                            {t('Rookvrijspelen is een initiatief van Longfonds en ABN Ambro. Wij streven ernaar dat elk kind dat in 2019 wordt geboren Rookvrij kan opgroeien. Dat kan in een omgeving, zonder verleidingen en met goede voorbeelden om je heen. Hoe minder mensen je ziet roken, hoe minder vanzelfsprekend het wordt om zelf te gaan roken. Iedereen kan helpen met het Rookvrij maken van onze omgeving.')}
                        </p>
                        <p className={classes.text}>
                            {t('Rookvrijspelen biedt een persoonlijke plek om een actiepagina op te zetten rondom een speeltuin. Op de actiepagina kan een ieder stappen doorlopen om de speeltuin versneld rookvrij te maken en te helpen houden. De personen rondom een actiepagina kunnen samen een team vormen en met elkaar chatten.')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


Explanation.propTypes = {
    classes: PropTypes.object.isRequired,
    whiteFont: PropTypes.bool
};

export default withStyles(explanationStyle)(withTranslation("transations")(Explanation));
