/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import {Link} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import {AccountCircle, Menu} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Hidden from "@material-ui/core/Hidden";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import JSignOut from "../../auth/JSignOut";
import { connect } from 'react-redux'
import { Button } from "@material-ui/core";
import { signOutUser, deleteUser } from "../UserProfile/UserProfileActions";
import { getUser } from "../UserProfile/UserProfileReducer";

const mapStateToProps = state => ({
    user: getUser(state)
})
const mapDispatchToProps = dispatch => ({
    signOutUser:    () =>     dispatch(signOutUser()),
    deleteUser:    () =>     dispatch(deleteUser()),
})

function HeaderLinks(props) {
    const {classes, user} = props;
    return (
        <List className={classes.list}>

             {/* For now do not include the menu as there are no items to display */}

            {/* <ListItem className={classes.listItem}>
                <Hidden smDown>
                    <CustomDropdown
                        noLiPadding
                        buttonText=""
                        buttonProps={{
                            className: classes.navLink,
                            color: "transparent"
                        }}
                        buttonIcon={Menu}
                        dropdownList={[
                            <Link to="/" className={classes.dropdownLink}>
                                Overzicht van speeltuinen
                            </Link>,

                        ]}
                    />
                </Hidden>
                <Hidden mdUp implementation="css">
                    <Link to="/" className={classes.dropdownLink}>
                        Overzicht van speeltuinen
                    </Link>
                </Hidden>
            </ListItem> */}

            { user &&
                <ListItem className={classes.listItem}>
                    <Hidden smDown implementation="css">
                        <CustomDropdown
                            noLiPadding
                            buttonText=""
                            buttonProps={{
                                className: classes.navLink,
                                color: "transparent"
                            }}
                            buttonIcon={AccountCircle}
                            dropdownList={[
                                <Button >Mijn profiel</Button>, 
                                <Button onClick={props.deleteUser}>Uitschrijven</Button>, 
                                <Button onClick={props.signOutUser}>Uitloggen</Button>, 
                            ]}
                        />
                    </Hidden>
                    <Hidden mdUp>
                        <JSignOut layout={"list"}/>
                    </Hidden>
                </ListItem>
                }
        </List>
    );
}

export default withStyles(headerLinksStyle)(connect(mapStateToProps, mapDispatchToProps)(HeaderLinks))
