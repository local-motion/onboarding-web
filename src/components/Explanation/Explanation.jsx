/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import explanationStyle from "assets/jss/material-kit-react/components/explanationStyle.jsx";
import { withTranslation } from 'react-i18next';
import { withStyles } from "@material-ui/core";

const Explanation = ({ t, classes = {} }) => {
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.flex}>
                    <div className={classes.left}>
                        <img className={classes.image} src="//placehold.it/150x40" alt="" />
                        <img className={classes.image} src="//placehold.it/120x40" alt="" />
                        <img className={classes.image} src="//placehold.it/150x50" alt="" />
                    </div>
                    <div className={classes.right}>
                        <p className={classes.text}>
                            {t('Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sapiente quaerat ab officia. Vero optio ex nemo adipisci reprehenderit nostrum molestiae esse laborum, cumque impedit iste praesentium, odio voluptates tempore!')}
                        </p>
                        <p className={classes.text}>
                            {t('Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sapiente quaerat ab officia. Vero optio ex nemo adipisci reprehenderit nostrum molestiae esse laborum, cumque impedit iste praesentium, odio voluptates tempore!')}
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
