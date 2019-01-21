import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withNamespaces } from "react-i18next";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
// @material-ui/icons
import CustomDialog from 'components/Dialogs/CustomDialog.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SET_SMOKEFREE_DATE, setSmokefreeDate } from "../../../components/Playground/PlaygroundActions";
import { createLoadingSelector, createErrorMessageSelector } from "../../../api/Selectors";
import { connect } from 'react-redux'

const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector([SET_SMOKEFREE_DATE]);
    const errorMessageSelector = createErrorMessageSelector([SET_SMOKEFREE_DATE]);
    return {
        loading: loadingSelector(state),
        error: errorMessageSelector(state),
    }
}

const mapDispatchToProps = dispatch => ({
    setSmokefreeDate:    (initiativeId, smokeFreeDate) =>     dispatch(setSmokefreeDate(initiativeId, smokeFreeDate)),
})


class SmokefreeDate extends React.Component {

    dateToString(date) {
        let year = date.getFullYear();
        let monthPadded = ("0" + (date.getMonth()+1)).slice(-2);
        let dayPadded = ("0" + date.getDate()).slice(-2);
        return year + '-' + monthPadded + '-' + dayPadded
    }

    onChangeState = (date) => {
        this.props.setSmokefreeDate(window.location.pathname.split("/").pop(), this.dateToString(date))
    }

    render() {
        const {loading, error} = this.props
        const date = this.props.startDate || new Date()

        return (
                    <div className={"card-datepicker"}>
                        <DatePicker
                            dateFormat="dd-MM-YYYY"
                            selected={date}
                            minDate={new Date()}
                            onChange={this.onChangeState}
                        />
                        {loading && <p>Loading...</p>}
                        {error &&
                        <CustomDialog title={"Er is een fout opgetreden"} content={error.message}></CustomDialog>
                        }
                    </div>
        );
    }
}

export default withStyles(componentsStyle)(withNamespaces("translations")((connect(mapStateToProps, mapDispatchToProps)(SmokefreeDate))));
