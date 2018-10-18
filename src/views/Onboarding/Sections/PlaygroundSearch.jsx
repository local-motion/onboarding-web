import React from 'react'
import lunr from 'lunr'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {withNamespaces} from 'react-i18next';

// @material-ui/icons
import Search from "@material-ui/icons/Search";
import image from "assets/img/bg.jpg";

// core components
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

const GET_PLAYGROUNDS = gql`
    {
        playgrounds {
            id
            name
        }
    }
`;

const withPlaygrounds = graphql(GET_PLAYGROUNDS, {
        // `ownProps` are the props passed into `MyComponentWithData`
        // `data` is the result data (see above)
        props: ({ownProps, data}) => {
            if (data.loading) return {playgroundsLoading: true};
            if (data.error) return {hasErrors: true};
            return {
                onSelectPlayground: playground => {
                    alert('Picked ' + playground.id);
                },
                playgrounds: data.playgrounds.map(playground => {
                    return {
                        id: playground.id,
                        name: playground.name,
                    }
                })
            }
        }
    }
);

class SearchBar extends React.Component {
    render() {
        const {t, classes, playgrounds, onSelectPlayground} = this.props;
        if (!playgrounds) return null;

        const idx = lunr(function () {
            this.ref('id');
            this.field('name');
            // noinspection JSUnusedGlobalSymbols
            this.metadataWhitelist = ['position'];

            playgrounds.forEach(function (doc) {
                this.add(doc)
            }, this)
        });

        let results = idx.search("Linn*");
        return (
                <Header
                    // brand="Find your playground"
                    color="rose"
                    leftLinks={
                        <div>
                            <CustomInput
                                white
                                inputRootCustomClasses={classes.inputRootCustomClasses}
                                formControlProps={{
                                    className: classes.formControl
                                }}
                                inputProps={{
                                    placeholder: "Search",
                                    inputProps: {
                                        "aria-label": "Search",
                                        className: classes.searchInput
                                    }
                                }}
                            />
                            <Button justIcon round color="white">
                                <Search className={classes.searchIcon} />
                            </Button>
                        </div>
                    }
                />
        )
    }
}
const TranslatedSearch = withNamespaces("translations")(SearchBar);
const PlaygroundSearch = withPlaygrounds(TranslatedSearch);
export default withStyles(navbarsStyle)(PlaygroundSearch);