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
import { connect } from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Search from "@material-ui/icons/Search";

import { ensurePlaygrounds } from "../../../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../../../components/Playground/PlaygroundReducer";
import cities from "assets/nl-cities.json";

// const mapStateToProps = state => ({
//     playgrounds: getAllPlaygrounds(state).map(playground => ({
//         id: playground.id,
//         name: playground.name,
//         lat: playground.lat,
//         lng: playground.lng,
//         vol: playground.volunteerCount,
//         votes: playground.votes,
//         slug: playground.name + " Rookvrij",
//         zoom: 18,
//         default: false,
//     })  )
// })
const mapStateToProps = state => ({
    playgrounds: [...cities, ...getAllPlaygrounds(state)]
});

const mapDispatchToProps = dispatch => {
    return {
        ensurePlaygrounds:    () =>     dispatch(ensurePlaygrounds()),
      }
};

function renderInputComponent(inputProps) {
    const {
        classes, inputRef = () => {}, ref, ...other
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
            },
            disableUnderline: true,
            endAdornment:
              <InputAdornment className={classes.searchIcon} disablePointerEvents position="end">
                  <Search color="disabled" />
              </InputAdornment>
        }}
        {...other}
      />
    );
}

const suggestionStyles = {
    hovered: {
        backgroundColor: '#258ecc',
        color: '#FFF',
    },
    notHovered: {
        color: '#626262',
    },
};

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <div className="playground-suggestionContainer">
          <MenuItem
            selected={isHighlighted}
            component="div"
            style={isHighlighted
              ? suggestionStyles.hovered
              : suggestionStyles.notHovered
            }
          >
              <div>
                  {parts.map((part, index) => {
                      return part.highlight ? (
                        <span key={index} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                      ) : (
                        <strong key={index} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                      );
                  })}
              </div>
          </MenuItem>
      </div>
    );
}

function getSuggestions(value, suggestions) {
    const inputValue = deburr(value.trim()).toLowerCase();
    let count = 0;

    return inputValue.length === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 &&
            deburr(suggestion.name).toLowerCase().indexOf(inputValue) > -1;
          if (keep)
              count++;

          return keep;
      });
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        border: 'none',
        backgroundColor: "#FFF",
        boxShadow: "0px 10px 23px 1px rgba(40, 40, 40, 0.15)",
        position: "absolute",
        left: 30,
        top: 30,
        width: 438,
        height: 50,
        zIndex: 4,
        borderRadius: 6,

        [theme.breakpoints.down('sm')]: {
            left: 20,
            top: 20,
            width: 'calc(100% - 40px)',
        },
    },
    container: {
        position: "relative"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 99,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none",
    },
    renderSuggestionsContainer: {
        margin: '5px 0',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: 'none',
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 25,
    }
});

class IntegrationAutosuggest extends React.Component {
    constructor() {
        super();

        this.state = {
            single: "",
            popper: "",
            suggestions: [],
            selectedPlayground: {}
        };
    }

    componentDidMount() {
        // this.props.ensurePlaygrounds()
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
        if (event.key === "Enter")
            this.selectPlayground();
        else
            this.setState({
                [name]: newValue
            });
    };

    // If the search field contains the full playground name then select this playground (will select the playground stats and entry options)
    selectPlayground = () => {
        const self = this;
        window.setTimeout(function() {
            const suggestion = self.state.popper;
            let result = self.props.playgrounds.find(a => a.name === suggestion);
            self.props.onPlaygroundChange.bind(self, result)();
        }, 110);
    };

    render() {
        const { playgrounds, classes } = this.props;

        if (!playgrounds)
            return "loading...";

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion
        };

        return (
          <div className={classes.root}>
              <div className="playground autosuggest">
                  <div className={classes.divider}/>
                  <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        placeholder: "Zoek speeltuin",
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
                        this.selectPlayground()
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
                                    className={classes.renderSuggestionsContainer}
                                >
                                    {options.children}
                                </Paper>
                            </Popper>
                        </div>
                    )}
                  />
              </div>
          </div>
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IntegrationAutosuggest));

