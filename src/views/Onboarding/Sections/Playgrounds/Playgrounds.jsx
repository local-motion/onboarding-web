import React, { Component } from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import componentsStyle from "../../../../assets/jss/material-kit-react/views/components";
import PlaygroundSearch from "./PlaygroundSearch";
import PlaygroundMap from "./PlaygroundMap";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import PlaygroundCta from "./PlaygroundCta";
import WorkspaceWelcomeContent from "../../../Workspace/Sections/WorkspaceWelcome/WorkspaceWelcomeContent";

class Playgrounds extends Component {
    render() {
        const {
            playgrounds,
            classes,
            onCtaClick,
            playground,
            map,
            user,
            handlePlaygroundChange,
        } = this.props;

        return (
          <div className={classNames(classes.main) + " onboarding-container"}>
              <div className={classes.playgroundsTitle}>Zoek een speeltuin in jouw buurt een doe mee!</div>
              <div className={classes.playgroundsBg} />
              <GridContainer className={"grid-container-map"}>
                  <GridItem xs={12} sm={12} md={playground.default ? 12 : 9} className={"playground-map-container"}>
                      <PlaygroundSearch onPlaygroundChange={handlePlaygroundChange} playgrounds={playgrounds}/>

                      <PlaygroundMap
                        isMarkerShown
                        viewOnly
                        onPlaygroundChange={handlePlaygroundChange}
                        center={map.latlng}
                        zoom={map.zoom}
                      />

                      <PlaygroundCta onCtaClick={onCtaClick} />
                  </GridItem>
                  {
                      !playground.default && (
                        <GridItem xs={12} sm={12} md={3} className={"playground-stat-container"}>
                            <WorkspaceWelcomeContent playground={playground} user={user} />
                        </GridItem>
                      )
                  }
              </GridContainer>
          </div>
        );
    }
}

export default withStyles(componentsStyle)(Playgrounds);