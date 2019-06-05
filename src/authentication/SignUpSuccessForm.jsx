import React, {Component} from 'react';
import {Button} from '@material-ui/core'
import { withRouter } from "react-router-dom";
import { style } from './AuthenticatorStyles';


/**
 * This form just confirms the successful signup of the user.
 */
class SignUpSuccessForm extends Component {

    render() {
        const isInCard = this.props.location.pathname.includes('actie');
        const {changeForm} = this.props;

        return (
            <div className={isInCard ? "secure-app-wrapper-card" : "secure-app-wrapper"}>
                {isInCard || <div className={"secure-app-background"}></div>}
                <div className={"secure-app-container"}>
                    <h1 className={"grunge-title"}>Je emailadres is gevalideerd</h1>
                    <div className={"signin-wrapper"}>
                        <form style={style} >
                            <Button
                                style={style.loginButton}
                                variant="contained"
                                color="primary"
                                onClick={() => changeForm('signIn')}
                            >
                                Ga verder met inloggen
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUpSuccessForm)
