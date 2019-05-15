import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs } from "react-google-maps";
import PlacesAutocomplete from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Search from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
    textInput: {
        width: 400,
    },
    cssLabel: {
        transform: 'translate(12px, 14px) scale(1)',
        '&$cssFocused': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
    },
    cssFocused: {},
    suggestionContainer: {
        margin: '5px 0',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: 'none',
        border: '1px solid #CCC',
        position: 'absolute',
        zIndex: 999,
        background: '#FFF',
    },
    suggestionActive: {
        backgroundColor: '#258ecc',
        color: '#FFF !important',
    },
    suggestion: {
        color: '#626262',
        padding: '12px 5px',
        cursor: 'pointer',
        borderBottom: '1px solid #CCC',
    },
});

const PlacesAutocompleteImpl = compose(
  withProps({
      loadingElement: <div style={{ height: `100%` }}>Loading...</div>,
      containerElement: <div style={{ height: `400px` }} />,
  }),
  window.google ? null : withScriptjs
)(props =>
  <PlacesAutocomplete
    value={props.addressInput}
    onChange={props.handleChange}
    onSelect={props.handleSelect}
    className={props.classes.textInput}
    searchOptions={{
        componentRestrictions: {country: "nl"},
    }}
  >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div>
            <TextField
              type="text"
              variant="outlined"
              name="search"
              className={props.classes.textInput}
              label="Zoek naar speeltuinen bij je in de buurt"
              autoFocus
              placeholder="e.g. 9402 AS"
              InputLabelProps={{
                  classes: {
                      root: props.classes.cssLabel,
                      focused: props.classes.cssFocused,
                  }
              }}
              InputProps={{
                  endAdornment:
                    <InputAdornment disablePointerEvents position="end">
                        <Search color="disabled" />
                    </InputAdornment>,
                  inputProps: {
                      style: {
                          padding: "12px 14px"
                      }
                  }
              }}
              {...getInputProps()}
            />

            {!!suggestions.length && (
              <div className={props.classes.suggestionContainer}>
                  {suggestions.map(suggestion => {
                      const className = `
                        ${props.classes.suggestion}
                        ${suggestion.active ? props.classes.suggestionActive : ''}
                      `;

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                              className,
                          })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                      );
                  })}
              </div>
            )}
        </div>
      )}
  </PlacesAutocomplete>
);

const GooglePlacesAutocomplete = props => (
  <PlacesAutocompleteImpl
    {...props}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.googleMapsKey}&v=3.exp&libraries=geometry,drawing,places`}
  />
);

export default withStyles(styles)(GooglePlacesAutocomplete);