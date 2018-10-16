import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DOGS = gql`
    {
        dogs {
            id
            breed
        }
    }
`;

const Dogs = ({ onDogSelected }) => (
    <Query query={GET_DOGS}>
        {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
                <select name="dog" onChange={onDogSelected}>
                    {data.dogs.map(dog => (
                        <option key={dog.id} value={dog.breed}>
                            {dog.breed}
                        </option>
                    ))}
                </select>
            );
        }}
    </Query>
);

class PlaygroundDetails extends React.Component {
    render() {
        const { classes, playground } = this.props;
        return (
            <div className={classes.section}>
                <div className={classes.container}>
                    <div id="navigation-pills">
                        <div className={classes.title}>
                            <h3>Navigation Pills {playground && playground.id}</h3>
                        </div>
                        <div className={classes.title}>
                            <h3>
                                <small>With Icons</small>
                            </h3>
                            <Dogs/>
                        </div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8} lg={6}>
                                <NavPills
                                    color="primary"
                                    tabs={[
                                        {
                                            tabButton: "Dashboard",
                                            tabIcon: Dashboard,
                                            tabContent: (
                                                <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                        </span>
                                            )
                                        },
                                        {
                                            tabButton: "Schedule",
                                            tabIcon: Schedule,
                                            tabContent: (
                                                <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions. Dramatically visualize
                            customer directed convergence without revolutionary
                            ROI. Collaboratively administrate empowered markets
                            via plug-and-play networks. Dynamically
                            procrastinate B2C users after installed base
                            benefits.
                          </p>
                        </span>
                                            )
                                        },
                                        {
                                            tabButton: "Tasks",
                                            tabIcon: List,
                                            tabContent: (
                                                <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                        </span>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} lg={6}>
                                <NavPills
                                    color="rose"
                                    horizontal={{
                                        tabsGrid: { xs: 12, sm: 4, md: 4 },
                                        contentGrid: { xs: 12, sm: 8, md: 8 }
                                    }}
                                    tabs={[
                                        {
                                            tabButton: "Dashboard",
                                            tabIcon: Dashboard,
                                            tabContent: (
                                                <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                        </span>
                                            )
                                        },
                                        {
                                            tabButton: "Schedule",
                                            tabIcon: Schedule,
                                            tabContent: (
                                                <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions. Dramatically visualize
                            customer directed convergence without revolutionary
                            ROI. Collaboratively administrate empowered markets
                            via plug-and-play networks. Dynamically
                            procrastinate B2C users after installed base
                            benefits.
                          </p>
                        </span>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(pillsStyle)(PlaygroundDetails);
