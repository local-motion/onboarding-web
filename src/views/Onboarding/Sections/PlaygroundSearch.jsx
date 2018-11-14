import React from "react";
import lunr from "lunr";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withNamespaces } from "react-i18next";
// core components
import withStyles from "@material-ui/core/styles/withStyles";

import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";
import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";
import Autosuggest from "react-autosuggest";

// @material-ui/icons
import Search from "@material-ui/icons/Search";
// import image from "assets/img/bg.jpg";

const GET_PLAYGROUNDS = gql`
  {
    playgrounds {
      id
      name
      lat
      lng
      status
    }
  }
`;

const withPlaygrounds = graphql(GET_PLAYGROUNDS, {
  // `ownProps` are the props passed into `MyComponentWithData`
  // `data` is the result data (see above)
  props: ({ ownProps, data }) => {
    if (data.loading) return { playgroundsLoading: true };
    if (data.error) return { hasErrors: true };
    return {
      onSelectPlayground: playground => {
        alert("Picked " + playground.id);
      },
      playgrounds: data.playgrounds.map(playground => {
        return {
          id: playground.id,
          name: playground.name,
          lat: playground.lat,
          lng: playground.lng
        };
      })
    };
  }
});

class SearchBar extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: []
    };
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const playgrounds = this.props.playgrounds;
    const idx = lunr(function() {
      this.ref("id");
      this.field("name");
      // noinspection JSUnusedGlobalSymbols
      this.metadataWhitelist = ["position"];

      playgrounds.forEach(function(doc) {
        this.add(doc);
      }, this);
    });

    function addPlaygroundToResult(result) {
      return {
        playground: playgrounds.find(
          playground => playground.id === result.ref
        ),
        ...result
      };
    }

    // TODO: Consider adding search metadata to result. Allows text highlighting.
    return idx.search(value + "*").map(addPlaygroundToResult);
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.playground.name;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.playground.ref} - {suggestion.playground.name}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    console.log("Autosuggest changed to: ", newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { t, classes, playgrounds, onPlaygroundChange } = this.props;
    const { value, suggestions } = this.state;
    if (!playgrounds) return null;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: t("onboarding.playground.search.title"),
      value,
      onChange: this.onChange
    };

    let onSuggestionSelected = (evt, { suggestion }) => {
      console.log("Selected ", suggestion);
      onPlaygroundChange(suggestion.playground);
    };

    // Finally, render it!
    return (
      <div className="playground-search">
        <TextField
          fullWidth
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
        <Autosuggest
          className={classes.textField}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionSelected={onSuggestionSelected}
          renderSuggestion={this.renderSuggestion}
          highlightFirstSuggestion={true}
          inputProps={inputProps}
        />
        <Button justIcon>
          <Search className={classes.searchIcon} />
        </Button>
      </div>
    );
  }
}

const TranslatedSearch = withNamespaces("translations")(SearchBar);
const PlaygroundSearch = withPlaygrounds(TranslatedSearch);
export default withStyles(navbarsStyle)(PlaygroundSearch);
