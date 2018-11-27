import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withNamespaces } from "react-i18next";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { graphql } from "react-apollo";
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
    props: ({ /*ownProps, */data }) => {
        if(data.loading) return { playgroundsLoading: true };
        if(data.error) return { hasErrors: true };
        if(data.error) return { hasErrors: true };
        console.log(data);
        return {};
    }
});

const playground = {
    name: "test playground",
    address: "test address",
    latitude: 100,
    longitude: 100,
    contactName: "Bob Dobbs",
    contactemail: "bob@subgenius.com"
};

class NewPlayground extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (
            <form>
                <input type="text" placeholder="Playground name" defaultValue={playground.name}/>
                <input type="text" placeholder="Address" defaultValue={playground.address}/>
                <input type="text" placeholder="Contact name" defaultValue={playground.contactName}/>
                <input type="text" placeholder="Contact email" defaultValue={playground.email}/>

                <input type="hidden" id={"latitude"} defaultValue={playground.latitude}/>
                <input type="hidden" id={"longitude"} defaultValue={playground.latitude}/>
            </form>
    );
  }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(NewPlayground)
);
