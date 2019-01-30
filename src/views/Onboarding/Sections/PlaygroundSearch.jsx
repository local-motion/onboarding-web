import Dialog from '@material-ui/core/Dialog';

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
import {withStyles} from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { createLoadingSelector, createErrorMessageSelector } from "../../../api/Selectors";
import { GET_PLAYGROUNDS, ensurePlaygrounds } from "../../../components/Playground/PlaygroundActions";
import { getAllPlaygrounds } from "../../../components/Playground/PlaygroundReducer";


const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector([GET_PLAYGROUNDS]);
    const errorMessageSelector = createErrorMessageSelector([GET_PLAYGROUNDS]);

    return {
        playgroundsLoading: loadingSelector(state),
        hasErrors: errorMessageSelector(state) !== '',
        error: errorMessageSelector(state),
        playgrounds: getAllPlaygrounds(state).map(playground => {
            return {
                id: playground.id,
                name: playground.name,
                lat: playground.lat,
                lng: playground.lng,
                vol: playground.volunteerCount,
                votes: playground.votes,
                slug: playground.name + " Rookvrij",
                zoom: 18,
                default: false,
            };
        })
  }
}

const mapDispatchToProps = dispatch => {
    return {
        ensurePlaygrounds:    () =>     dispatch(ensurePlaygrounds()),
      }
}



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

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
        <div className="playground-suggestionContainer">
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map((part, index) => {
                        return part.highlight ? (
                            <span key={index} style={{fontWeight: 500}}>
                                {part.text}
                            </span>
                        ) : (
                            <strong key={index} style={{fontWeight: 300}}>
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
                suggestion.name.toLowerCase().indexOf(inputValue) > -1
            if (keep)
                count++

                return keep
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
        this.props.ensurePlaygrounds()
    }

    handleSuggestionsFetchRequested = ({value}) => {
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
    handleChange = name => (event, {newValue}) => {
        if (event.key === 'Enter')
            this.selectPlayground()
        else
            this.setState({
                [name]: newValue
            });
    };

    // If the search field contains the full playground name then select this playground (will select the playground stats and entry options)
    selectPlayground = () => {
        const self = this;
        window.setTimeout(function () {
            const suggestion = self.state.popper;
            let result = self.props.playgrounds.find(a => a.name === suggestion);
            self.props.onPlaygroundChange.bind(self, result)();
        }, 110);
    }

    render() {
        const {playgroundsLoading, classes, onPlaygroundChange} = this.props;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion
        };

        if (playgroundsLoading) {
            return "loading..";
        }

        return (
            <div className={classes.root + " playground autosuggest"}>
                {this.props.hasErrors === true &&
                <Dialog open={true} className={classes.container}>{this.props.error}</Dialog>
                }

                <div className={classes.divider}/>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        placeholder: "Vul hier de naam van een speeltuin in om te zoeken",
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IntegrationAutosuggest));

