import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "@material-ui/core/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
// core components
import { withNamespaces } from "react-i18next";

const SET_SMOKEFREE_DATE = gql`
    mutation CommitToSmokeFreeDateCommand {
        initiativeId
        smokeFreeDate
    }
`;

class SmokefreeDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date()
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleChangeDate(targetDate) {
        this.setState({
            startDate: targetDate
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date()
        };
    }


    render() {
        return (
            <div>
                <h2>Pick a date</h2>

                <Mutation
                    mutation={SET_SMOKEFREE_DATE}
                    update={null}
                >
                    {(setSmokeFreeDate) => (
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={() => setSmokeFreeDate({ variables: { input: this.state.startDate } })}
                        />
                    )}
                </Mutation>
            </div>
        );
    }
}

export default withStyles()(
    withNamespaces("translations")(SmokefreeDate)
);
