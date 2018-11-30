/*
decideToBecomeSmokeFree(input: DecideToBecomeSmokeFreeCommand!): InputAcceptedResponse!
decideToNotBecomeSmokeFree(input: DecideToNotBecomeSmokeFreeCommand!): InputAcceptedResponse!
|*/

import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Button from "@material-ui/core/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// core components
import { withNamespaces } from "react-i18next";

class SmokefreeDecision extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            status: props.smokefree
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChangeDate(e) {
        console.log("date", e);
        this.setState({
            startDate: e
        });
    }

    handleChangeStatus(e) {
        console.log("status", e.target.checked);
        this.setState({
            status: e
        });
    }

    handleSubmit(e) {
        console.log("submit", e);
    }

    render() {
        const { t, playground } = this.props;

        return (
            <div>
                <label>
                    <input type="checkbox" id={"smokeFree"}  onChange={this.handleChangeStatus}/>
                    Make smoke free
                </label>

                <br/>

                <label>From<br/>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeDate}
                    />
                </label>

                <Button onClick={this.handleSubmit}>
                    {t("onboarding.playground.calltoaction.button")}
                </Button>
            </div>
        );
    }
}

export default withStyles()(
    withNamespaces("translations")(SmokefreeDecision)
);
