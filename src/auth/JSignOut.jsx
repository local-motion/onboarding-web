import React, {Component} from 'react';
import {Button} from '@material-ui/core'
import {Auth, Logger} from 'aws-amplify';

const logger = new Logger('JSignOut');

export default class JSignOut extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        Auth.signOut()
            .then(() => logger.info('sign out success'))
            .catch(err => logger.info('sign out error', err));
    }

    render() {
        const {layout} = this.props;
        return (
            <div>
                <div style={{textDecoration: 'underline', padding: '10px 20px', cursor: "pointer", display: (layout !== 'list' ? 'none' : 'inline-block') }} onClick={this.signOut}>
                    Uitloggen
                </div>
                <Button style={{textDecoration: 'underline', display: (layout === 'list' ? 'none' : 'inline-block') }} onClick={this.signOut}>
                    Sign Out
                </Button>
            </div>
        )
    }
}
