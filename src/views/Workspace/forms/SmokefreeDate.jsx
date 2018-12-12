import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withNamespaces } from "react-i18next";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
// @material-ui/icons
import CustomDialog from 'components/Dialogs/CustomDialog.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
// core components

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
            startDate: props.startDate || new Date(),
        };
    }

    static _dateToString(date) {
        let year = date.getFullYear();
        let monthPadded = ("0" + (date.getMonth()+1)).slice(-2);
        let dayPadded = ("0" + date.getDate()).slice(-2);
        return year + '-' + monthPadded + '-' + dayPadded
    }

    _changeState = (date) => {
        this.setState({
            startDate: date
        });
        this.props.onChange(date)
    };

    _onError = error => {
        const errorString = error.toString();
        let errorTranslation = "";
        switch (errorString){
            default:
                errorTranslation = "Er is een fout opgetreden, probeer het later nog eens";

        }

        this.setState({errorMessage: errorTranslation});
    };

    render() {
        const { errorMessage } = this.state;
        return (
            <Mutation mutation={SET_SMOKEFREE_DATE} update={null} onError={this._onError}>
                {(setSmokeFreeDate, { loading, error }) => (
                    <div className={"card-datepicker"}>
                        <DatePicker
                            dateFormat="YYYY-MM-dd"
                            selected={this.state.startDate}
                            minDate={new Date()}
                            onChange={(date) => {
                                this._changeState(date);

                                setSmokeFreeDate({ variables: {
                                        input: {
                                            smokeFreeDate: SmokefreeDate._dateToString(date),
                                            initiativeId: window.location.pathname.split("/").pop()
                                        }
                                    }
                                });
                            }}
                        />
                        {loading && <p>Loading...</p>}
                        {error &&
                        <CustomDialog title={"Er is een fout opgetreden"} content={errorMessage}></CustomDialog>
                        }
                    </div>
                )}
            </Mutation>
        );
    }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(SmokefreeDate)
);
