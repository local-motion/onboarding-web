import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import AddPlayground from "../../Onboarding/Sections/Playgrounds/AddPlayground";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";

const styles = theme => ({
    wrapper: {},
    search: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        marginRight: 10,
    },
    cssLabel: {
        transform: 'translate(12px, 14px) scale(1)',
        '&$cssFocused': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
    },
    cssFocused: {},
    searchButton: {
        background: '#eb621b',
        color: '#FFF',
        borderRadius: 5,
        boxShadow: 'none',
        height: 43,
        minWidth: 80,

        '&:hover': {
            color: '#FFF',
            borderColor: '#FFF',
            backgroundColor: 'rgba(235, 98, 27, .8)',
            boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
        },
    },
    gotoMapButton: {
        padding: '10px 17px',
        paddingRight: 40,

        '& svg': {
            position: 'absolute',
            right: 10,
            transition: 'all .3',
        },
        '&:hover svg': {
            right: 5,
        }
    },
});

const ArrowIcon = () => (
  <SvgIcon width="18px" height="14px" viewBox="0 0 24 17">
      <path fillRule="evenodd"
            d="M16.739,6.288 L10.661,0.288 C10.269,-0.100 9.636,-0.095 9.248,
            0.298 C8.860,0.691 8.864,1.324 9.258,1.712 L13.601,6.000 L1.963,
            6.000 C1.410,6.000 0.963,6.447 0.963,7.000 C0.963,7.553 1.410,
            8.000 1.963,8.000 L13.601,8.000 L9.258,12.288 C8.864,12.676 8.861,
            13.309 9.248,13.702 C9.444,13.900 9.702,14.000 9.960,14.000 C10.213,
            14.000 10.467,13.904 10.661,13.712 L16.739,7.712 C16.929,
            7.524 17.037,7.268 17.037,7.000 C17.037,6.732 16.930,6.477 16.739,
            6.288 Z"
      />
  </SvgIcon>
);


class AddFindPlayground extends Component {
    constructor(props) {
        super(props);

        this.toggleAddPlayground = this.toggleAddPlayground.bind(this);
        this.search = this.search.bind(this);
    }

    state = {
        isAddPlaygroundOpen: false,

    };

    toggleAddPlayground() {
        this.setState(({ isAddPlaygroundOpen }) => ({ isAddPlaygroundOpen: !isAddPlaygroundOpen }));
    }

    search(event) {
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        const { isAddPlaygroundOpen } = this.state;

        return (
          <div>
              <WorkspaceCard
                title={"Speeltuin toevoegen"}
                done={null}
                image={require("../../../assets/img/backgrounds/workspace-welcome.jpg")}
                content={"De eerste stap is om je aan te sluiten bij de actiepagina van jouw speeltuin, of om deze aan te maken. Vul je gegevens in om te beginnen."}
                expandContent={
                    <div className={classes.wrapper}>
                        <form onSubmit={this.search} className={classes.search}>
                            <div className={classes.searchBar}>
                                <TextField
                                  type="text"
                                  variant="outlined"
                                  name="postcode"
                                  className={classes.textInput}
                                  label="Postcode"
                                  autoFocus
                                  InputLabelProps={{
                                      classes: {
                                          root: classes.cssLabel,
                                          focused: classes.cssFocused,
                                      }
                                  }}
                                  inputProps={{
                                      style: {
                                          padding: '12px 14px'
                                      }
                                  }}
                                />

                                <TextField
                                  type="text"
                                  variant="outlined"
                                  className={classes.textInput}
                                  name="house"
                                  label="Huisnummer"
                                  InputLabelProps={{
                                      classes: {
                                          root: classes.cssLabel,
                                          focused: classes.cssFocused,
                                      }
                                  }}
                                  inputProps={{
                                      style: {
                                          padding: '12px 14px'
                                      }
                                  }}
                                />

                                <Button type="submit" variant="contained" className={classes.searchButton}>
                                    Zoek
                                </Button>
                            </div>

                            <Button className={classes.gotoMapButton}>
                                Of zoek op de kaart
                                <ArrowIcon />
                            </Button>
                        </form>
                    </div>
                }
              />

              <AddPlayground isOpen={isAddPlaygroundOpen} toggleOpen={this.toggleAddPlayground} />
          </div>
        );
    }
}

export default withRouter(withStyles(styles)(AddFindPlayground));