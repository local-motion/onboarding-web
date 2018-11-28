import { graphql } from "react-apollo";
import gql from "graphql-tag";
//import { withNamespaces } from "react-i18next";

//extra related to autosuggest demo + Material UI
import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";

const GET_PLAYGROUNDS = gql`
  {
    playgrounds {
      id
      name
      lat
      lng
      status
      volunteerCount
      votes
    }
  }
`;

const withPlaygrounds = graphql(GET_PLAYGROUNDS, {
    // `ownProps` are the props passed into `IntegrationAutosuggest`
    // `data` is the result data (see above)
    props: ({ownProps, data }) => {
        if(data.loading) return { playgroundsLoading: true };
        if(data.error) return { hasErrors: true };
        if(data.error) return { hasErrors: true };
        return {
            playgrounds: data.playgrounds.map(playground => {
                return {
                    id: playground.id,
                    name: playground.name,
                    lat: playground.lat,
                    lng: playground.lng,
                    vol: playground.volunteerCount,
                    votes: playground.votes,
                    slug: playground.name + " Rookvrij"
                };
            })
        };
    }
});

function renderInputComponent(inputProps) {
    const {
        classes, inputRef = () => {
        }, ref, ...other
    } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input
                }
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
        <div className="playground-suggestionContainer">
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map((part, index) => {
                        return part.highlight ? (
                            <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
                        ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        );
                    })}
                </div>
            </MenuItem>
        </div>
    );
}

function getSuggestions(value, suggestionList) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    const suggestions = suggestionList;

    //console.log(value, suggestionList);

    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 &&
                suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;
            if(keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        position: "relative",
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 99,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none"
    }
});

class IntegrationAutosuggest extends React.Component {
    //cons
    constructor() {
        super();

        this.state = {
            single: "",
            popper: "",
            suggestions: [],
            selectedPlayground: {}
        };
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        const playgrounds = this.props.playgrounds;
        this.setState({
            suggestions: getSuggestions(value, playgrounds)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue
        });
    };

    render() {
        const { classes, onPlaygroundChange } = this.props;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion
        };

        return (
            <div className={classes.root + " playground autosuggest"}>
                <div className={classes.divider}/>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        placeholder: "Enter a playground",
                        value: this.state.popper,
                        onChange: this.handleChange("popper"),
                        inputRef: node => {
                            this.popperNode = node;
                        },
                        InputLabelProps: {
                            shrink: true
                        }
                    }}
                    onSuggestionSelected={() => {
                        const self = this;
                        window.setTimeout(function() {
                            const suggestion = self.state.popper;
                            let result = self.props.playgrounds.find(a => a.name === suggestion);
                            onPlaygroundChange.bind(self, result)();
                        }, 110);
                    }}
                    theme={{
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    }}
                    renderSuggestionsContainer={options => (
                        <div>
                            <Popper
                                anchorEl={this.popperNode}
                                open={Boolean(options.children)}
                            >
                                <Paper
                                    square
                                    {...options.containerProps}
                                    style={{
                                        width: this.popperNode ? this.popperNode.clientWidth : null
                                    }}
                                >
                                    {options.children}
                                </Paper>
                            </Popper>
                        </div>
                    )}
                />
            </div>
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired
};

const playgroundSearch = withPlaygrounds(IntegrationAutosuggest);
export default withStyles(styles)(playgroundSearch);
