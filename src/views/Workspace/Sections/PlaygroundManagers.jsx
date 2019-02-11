import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import {withNamespaces} from "react-i18next";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = {
    avatar: {
      margin: 10,
    },
    purpleAvatar: {
      margin: 0,
      color: '#fff',
      backgroundColor: deepPurple[500],
    },
  }

class PlaygroundManagers extends React.Component {
    render() {
        const {playground, user, classes} = this.props;
        if (!playground) return "Loading...";
        return (
            <div>
                <div className={playground.volunteers.length > 0 ? 'manager-container' : 'hide'}>
                    <List>
                        {playground.volunteers.map(function (volunteer, index) {
                            const volunteerIsManager = playground.managers.filter(manager => manager.id === volunteer.userId).length > 0
                            return <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar className={user && volunteer.userId === user.id ? classes.purpleAvatar : classes.avatar }>
                                        {volunteer.userName.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={volunteer.userName} secondary={volunteerIsManager ? '(Beheerder)' : ''}/>
                            </ListItem>
                        })}
                    </List>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(withStyles(pillsStyle)(
    withNamespaces("translations")(PlaygroundManagers)
))
