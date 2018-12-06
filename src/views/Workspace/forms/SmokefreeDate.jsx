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


    render() {
        return (
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
        );
    }
}

export default withStyles()(
    withNamespaces("translations")(SmokefreeDate)
);
