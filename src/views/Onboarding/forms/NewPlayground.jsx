import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withNamespaces } from "react-i18next";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
/*import { graphql } from "react-apollo";
import gql from "graphql-tag";

const PUT_PLAYGROUND = gql`
    {
        playground {
            name
            lng
            lat
        }
    }
`;

const withPlaygrounds = graphql(PUT_PLAYGROUND, {
    // `ownProps` are the props passed into `IntegrationAutosuggest`
    // `data` is the result data (see above)
    props: ({ ownProps, data }) => {
        if(data.loading) return { playgroundsLoading: true };
        if(data.error) return { hasErrors: true };
        if(data.error) return { hasErrors: true };
        console.log(data);
        return {};
    }
});*/

const playground = {
    name: "test playground",
    address: "test address",
    latitude: 100,
    longitude: 100,
    contactName: "Bob Dobbs",
    contactemail: "bob@subgenius.com"
};

class NewPlayground extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <h2>Add a playground</h2>
                <form className={classes.container}>
                    <TextField className={classes.textField} label="Playground name" defaultValue={playground.name}/>
                    <TextField className={classes.textField} label="Address" defaultValue={playground.address}/>
                    <TextField className={classes.textField} label="Contact name" defaultValue={playground.contactName}/>
                    <TextField className={classes.textField} label="Contact email" defaultValue={playground.contactemail}/>

                    <input type="hidden" id={"latitude"} defaultValue={playground.latitude}/>
                    <input type="hidden" id={"longitude"} defaultValue={playground.latitude}/>
                </form>

                <Button>Save</Button>
            </div>
        );
    }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(NewPlayground)
);
