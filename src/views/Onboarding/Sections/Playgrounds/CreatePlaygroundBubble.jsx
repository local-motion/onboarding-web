import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    wrapper: {
        background: '#FFF',
        borderRadius: 10,
        padding: 5,
    },
    title: {
        color: '#085ca6',
        fontFamily: "'dk_black_bamboo-webfont'",
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        margin: '15px 0 7px',
    },
    cssLabel: {
        transform: 'translate(12px, 14px) scale(1)',
        '&$cssFocused': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
    },
    cssFocused: {},
    button: {
        background: '#eb621b',
        color: '#FFF',
        boxShadow: 'none',
        marginTop: 7,

        '&:hover': {
            background: 'rgba(235, 98, 27, .8)',
            color: '#FFF',
        }
    }
});

class CreatePlaygroundBubble extends Component {
    render() {
        const { classes, name, onNewNameChange, error } = this.props;

        return (
          <div className={classes.wrapper}>
              <div className={classes.title}>speeltuin toevoegen</div>

              <TextField
                className={classes.input}
                autoFocus
                type="text"
                fullWidth
                variant="outlined"
                name="playground"
                value={name}
                pattern="/^\w{4,}$/"
                placeholder="Naam van de speeltuin"
                onChange={onNewNameChange}
                InputLabelProps={{
                    classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    }
                }}
                inputProps={{
                    style: {
                        padding: '12px 14px'
                    },
                    onKeyPress: (event) => {
                        if (event.key === 'Enter') this.props.onSubmit();
                    }
                }}
              />

              {error && <span className={"error alert"}>{error}</span>}

              <Button
                type="button"
                fullWidth
                variant="contained"
                className={classes.button}
                disabled={!name}
                onClick={this.props.onSubmit}
              >Bevestig</Button>
          </div>
        );
    }
}

export default withStyles(styles)(CreatePlaygroundBubble);