import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import headerStyle from "assets/jss/material-kit-react/components/headerStyle.jsx";
import { connect } from 'react-redux'
import { getUser } from "../UserProfile/UserProfileReducer";
import { Button } from "@material-ui/core";
import { ArrowLeftRounded } from "@material-ui/icons";
import { Link } from 'react-router-dom'
import EuroIcon from '@material-ui/icons/EuroSymbol';
import GroupIcon from '@material-ui/icons/Group';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ConfirmationDialog from "../../views/General/ConfirmationDialog";

const mapStateToProps = state => ({
    user: getUser(state)
})
const mapDispatchToProps = dispatch => ({
})

const toolbarButtonStyles = {
    root: {
        marginRight: 12,
    },
  }
const ToolbarButton = withStyles(toolbarButtonStyles)(props => (<Button {...props} />))

const lastToolbarButtonStyles = {
    root: {
        marginRight:  50,
    },
  }
const LastToolbarButton = withStyles(lastToolbarButtonStyles)(props => (<Button {...props} />))




class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false, 
            petitionDialogOpen: false,
            donationDialogOpen: false,
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.headerColorChange = this.headerColorChange.bind(this);
        this.openPetitionDialog = this.openPetitionDialog.bind(this);
        this.closePetitionDialog = this.closePetitionDialog.bind(this);
        this.openDonationDialog = this.openDonationDialog.bind(this);
        this.closeDonationDialog = this.closeDonationDialog.bind(this);
    }

    openPetitionDialog = () => {
        this.setState({ petitionDialogOpen: true })
    }
    closePetitionDialog() {
        this.setState({ petitionDialogOpen: false })
    }

    openDonationDialog = () => {
        this.setState({ donationDialogOpen: true })
    }
    closeDonationDialog() {
        this.setState({ donationDialogOpen: false })
    }

    handleDrawerToggle() {
        this.setState({mobileOpen: !this.state.mobileOpen});
    }

    componentDidMount() {
        if (this.props.changeColorOnScroll) {
            window.addEventListener("scroll", this.headerColorChange);
        }
    }

    headerColorChange() {
        const {classes, color, changeColorOnScroll} = this.props;
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > changeColorOnScroll.height) {
            document.body
                .getElementsByTagName("header")[0]
                .classList.remove(classes[color]);
            document.body
                .getElementsByTagName("header")[0]
                .classList.add(classes[changeColorOnScroll.color]);
        } else {
            document.body
                .getElementsByTagName("header")[0]
                .classList.add(classes[color]);
            document.body
                .getElementsByTagName("header")[0]
                .classList.remove(classes[changeColorOnScroll.color]);
        }
    }

    componentWillUnmount() {
        if (this.props.changeColorOnScroll) {
            window.removeEventListener("scroll", this.headerColorChange);
        }
    }

    signInClick = () => {
      this.props.history.push("/login")
    }
    
    render() {
        const {
            classes,
            color,
            rightLinks,
            leftLinks,
            brandLink,
            textBrand,
            brand,
            fixed,
            absolute,
            disableBackButton,
            user
        } = this.props

        const appBarClasses = classNames({
            [classes.appBar]: true,
            [classes[color]]: color,
            [classes.absolute]: absolute,
            [classes.fixed]: fixed
        })
        const brandContent = textBrand ? <h1 className={"grunge-title"}>{brand}</h1> : <img src={require("assets/img/logo-horizontal.png")} alt={"Rookvrije generatie logo"} style={{width: "250px"}} />
        const brandComponent = <div align='center'>{brandLink ? <Link to={brandLink}>{brandContent}</Link> : brandContent }</div>

        const {petitionDialogOpen, donationDialogOpen} = this.state

        return (
            <AppBar className={appBarClasses + " lm-header"}>
                <Toolbar className={classes.container}>

                    { !disableBackButton &&
                        <Button
                            component={Link} to="/"
                            // className={"btn btn-highlight pr-25 pull-right"} 
                            color="default"

                        >
                            <ArrowLeftRounded/>
                            <span>Kaart</span>
                        </Button>
                    }

                    {leftLinks !== undefined ? brandComponent : null}
                    <div className={classes.flex}>
                        {leftLinks !== undefined ? (
                            <Hidden smDown implementation="css">
                                {leftLinks}
                            </Hidden>
                        ) : (
                            brandComponent
                        )}
                    </div>



            <ToolbarButton color="default" className={classes.button}>
                <GroupIcon className={classes.rightIcon} />
                &nbsp;19
            </ToolbarButton>

            <ToolbarButton color="default" className={classes.button} onClick={() => this.openPetitionDialog()}>
                <ThumbUpIcon className={classes.rightIcon} />
                &nbsp;235
            </ToolbarButton>

            <LastToolbarButton color="default" className={classes.button} onClick={() => this.openDonationDialog()}>
                <EuroIcon className={classes.rightIcon} />
               &nbsp;53.60
            </LastToolbarButton>

            { petitionDialogOpen &&
                <ConfirmationDialog
                    title='Petitie tekenen'
                    message='Het is helaas nog niet mogelijk om petities te tekenen'
                    buttonMessage='Vooruit dan maar'
                    onClose={this.closePetitionDialog}
                />
            }

            { donationDialogOpen &&
                <ConfirmationDialog
                    title='Doneren'
                    message='Het is helaas nog niet mogelijk te doneren'
                    onClose={this.closeDonationDialog}
                />
            }

                    <Hidden smDown implementation="css">
                        {rightLinks}
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                        >
                            <Menu/>
                        </IconButton>
                    </Hidden>


                    { !user &&
                        <Button
                            onClick={() => this.signInClick()}
                            color="default"
                        >
                            <span>Inloggen</span>
                        </Button>
                    }

                </Toolbar>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={"right"}
                        open={this.state.mobileOpen}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        onClose={this.handleDrawerToggle}
                    >
                        <div className={classes.appResponsive}>
                            {leftLinks}
                            {rightLinks}
                        </div>
                    </Drawer>
                </Hidden>
            </AppBar>
        );
    }
}

Header.defaultProp = {
    color: "white"
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    rightLinks: PropTypes.node,
    leftLinks: PropTypes.node,
    brand: PropTypes.string,
    brandLink: PropTypes.string,
    textBrand: PropTypes.bool,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
    // this will cause the sidebar to change the color from
    // this.props.color (see above) to changeColorOnScroll.color
    // when the window.pageYOffset is heigher or equal to
    // changeColorOnScroll.height and then when it is smaller than
    // changeColorOnScroll.height change it back to
    // this.props.color (see above)
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
            "primary",
            "info",
            "success",
            "warning",
            "danger",
            "transparent",
            "white",
            "rose",
            "dark"
        ]).isRequired
    })
};



export default withStyles(headerStyle)(connect(mapStateToProps, mapDispatchToProps)(Header))
