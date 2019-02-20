import React from "react";
//import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import SimpleCard from "components/CustomCard/Card.jsx"
// import CollapseCard from "components/CustomCard/CollapseCard.jsx"

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import ShareSmokefreeCard from "../Cards/ShareSmokefreeCard.jsx";
import ValidateCard from "../Cards/ValidateCard.jsx";
import NewsCard from "../Cards/NewsCard.jsx";
import WhatsNextCard from "../Cards/WhatsNextCard.jsx";

class PhaseSustain extends React.Component {

    render() {
        const {classes, ...otherProps} = this.props;
        return (
            <div className={classes.container + " information-wrapper"}>
                <GridContainer className={"information-container"}>
                    <GridItem xs={12} sm={12} md={12} className={"phase-information-container flex-divide"}>

                        <ShareSmokefreeCard {...this.props} />
                        <ValidateCard {...otherProps} />
                        <NewsCard {...this.props} />
                        <WhatsNextCard {...this.props} />

                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(PhaseSustain);
