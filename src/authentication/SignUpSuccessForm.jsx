import React, {Component} from 'react';
import {Button, Typography} from '@material-ui/core'
import { withRouter } from "react-router-dom";


/**
 * This form just confirms the successful signup of the user.
 */
class SignUpSuccessForm extends Component {

    render() {
        const isInCard = !!this.props.match.params.initiativeId;
        const {changeForm} = this.props;

        const style = {
            width: '20rem',
            input: {borderRadius: '0', display: 'block'},
            links: {fontSize: '0.9em', minHeight: "25px"},
            button: {width: '100%', marginBottom: "15px"},
            extraButton: {border: "0", marginBottom: "15px", marginRight: "15px", cursor: "pointer"},
            left: {float: "left"},
            alert: {fontSize: '0.8em'}
        };

        return (
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Rookvrije Generatie</h1>
                    <div className={"signin-wrapper"}>
                        <form
                            style={style}
                        >
                            <Typography>Je email adres is gevalideerd!</Typography>
                            <span>
                            <Button
                                style={style.button}
                                onClick={() => changeForm('signIn')}
                            >
                                Ga verder met inloggen
                            </Button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUpSuccessForm)
