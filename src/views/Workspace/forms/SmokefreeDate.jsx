import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
// core components
import { withNamespaces } from "react-i18next";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

const SET_SMOKEFREE_DATE = gql`
    mutation CommitToSmokeFreeDate($input: CommitToSmokeFreeDateCommand!) {
        commitToSmokeFreeDate(input: $input) {
            id
        }
    }
`;

class SmokefreeDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
    }

    render() {
        return (
            <Mutation
                mutation={SET_SMOKEFREE_DATE}
                update={null}
            >
                {(setSmokeFreeDate) => (
                    <DatePicker
                        dateFormat="YYYY-m-dd"
                        selected={this.state.startDate}
                        onChange={() => setSmokeFreeDate({ variables: {
                            input: {
                                smokeFreeDate: this.state.startDate.getFullYear() + '-' + (this.state.startDate.getMonth()+1) + '-' + ("0" + this.state.startDate.getDate()).slice(-2),
                                initiativeId: window.location.pathname.split("/").pop()
                            }
                        }})}
                    />
                )}
            </Mutation>
        );
    }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(SmokefreeDate)
);
