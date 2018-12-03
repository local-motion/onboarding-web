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

const SET_SMOKEFREE = gql`
    mutation DecideToBecomeSmokeFreeCommand {
        initiativeId
    }
`;

const UNSET_SMOKEFREE = gql`
    mutation DecideToNotBecomeSmokeFreeCommand {
        initiativeId
        reason
    }
`;

const SET_SMOKEFREE_DATE = gql`
    mutation CommitToSmokeFreeDateCommand {
        initiativeId
        smokeFreeDate
    }
`;

class SmokefreeDecision extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            status: props.smokefree,
            reason: "none"
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChangeStatus(isSmokefree) {
        this.setState({
            status: isSmokefree
        });
    }

    handleChangeDate(targetDate) {
        this.setState({
            startDate: targetDate
        });
    }

    handleSubmitForm(e) {
        console.log("State", this.state);
        if(this.state.status !== this.props.status) {
            if(this.state.status === true) {
                console.log('set smoke free');
                //{() => DecideToBecomeSmokeFreeCommand({ variables: { input: this.state.status } })}
                if(this.state.startDate !== this.props.startDate) {
                    console.log('set startDate');
                    //{() => CommitToSmokeFreeDateCommand({ variables: { input: this.state.status } })}
                }
            } else {
                console.log('unset smoke free');
                console.log('reason', this.state.reason);
                //{() => DecideToNotBecomeSmokeFreeCommand({ variables: { input: this.state.status } })}
            }
        }

    }

    render() {
        const { t, playground } = this.props;

        return (
            <div>
                <label>
                    <input type="checkbox" id={"smokeFree"} defaultChecked={playground.status !== "not_started"} onChange={this.handleChangeStatus}/>
                    Make smoke free
                </label>

                <br/>

                <label>From<br/>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeDate}
                    />
                </label>

                <Mutation
                    mutation={SET_SMOKEFREE}
                    update={null}
                >
                    {(setSmokeFree) => (
                        //<Button onClick={() => setSmokeFree({ variables: { input: this.state } })}>
                        <Button onClick={this.handleSubmitForm.bind(this)}>
                            {t("onboarding.playground.calltoaction.button")}
                        </Button>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default withStyles()(
    withNamespaces("translations")(SmokefreeDecision)
);
