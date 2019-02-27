import React from "react";
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import { Button, Typography } from "@material-ui/core";
import ContentDialog from "../../../components/Dialogs/ContentDialog";
import { connect } from 'react-redux'
import { claimManagerRole } from "../../../components/Playground/PlaygroundActions";
import { isUserManagerOfPlayground, isUserVolunteerOfPlayground } from "../../../components/Playground/PlaygroundReducer";

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    claimManagerRole:    (initiativeId, onSuccessCallback) =>     dispatch(claimManagerRole(initiativeId, onSuccessCallback)),
})

class InvolveManagerCard extends React.Component {

    state = {
        tipsDialogOpen: false,
      }

    openTipsDialog()  {  this.setState({ tipsDialogOpen: true  })   }
    closeTipsDialog() {  this.setState({ tipsDialogOpen: false })   }

    render() {
        const {playground, user} = this.props;

        if (!playground) return "Loading..."

        const tipsContent = (
            <div>
                <Typography gutterBottom>
                    Google de speeltuin en kijk of ze een website of een facebookpagina hebben. Hierop kun je meestal een e-mailadres vinden.
                    Natuurlijk kun je de beheerder ook rechtstreeks op facebook benaderen.
                </Typography>
                <Typography gutterBottom>
                    Zoek de speeltuin op in het telefoonboek en geef ze een belletje.
                </Typography>
                <Typography gutterBottom>
                    Neem contact op met de gemeente. Zij weten meestal wel door wie een speeltuin beheerd wordt.
                </Typography>
            </div>
        )

        return (
            <WorkspaceCard title={"Betrek de beheerder"}
                done={playground.managers.length > 0}
                image={require("assets/img/backgrounds/gardeningtools.jpg")}
                content={"We kunnen de speeltuin alleen rookvrij maken samen met de beheerder. Nodig de beheerder uit om samen aan de slag te gaan."}
                expandContent={
                    <div>
                        <Button disabled={!isUserVolunteerOfPlayground(user, playground)}  variant="contained" size="small" color="primary" 
                            href={
                                "mailto:?" + 
                                "subject=" + playground.name /* TODO escapen */ + "%20rookvrij%20maken&" +
                                "body=Hallo,%0A%0A" + 
                                "Wij%20willen%20graag%20" + playground.name + "%20rookvrij%20maken.%20Hiervoor%20hebben%20we%20jouw%20hulp%20als%20beheerder%20hard%20nodig.%0A%0A" +
                                "Sluit%20je%20bij%20ons%20aan%20op%20rookvrij.nl:%20" +
                                "techoverflow-p.aws.abnamro.org/workspace/" + playground.id + "%0A"
                            }
                            >
                            Stuur uitnodiging
                        </Button>


                        <br /><br />
                        <Typography component="p">Weet je niet wie de beheerder is? Hier zijn wat tips om er achter te komen.</Typography>
                        <Button variant="contained" size="small" color="primary" onClick={() => this.openTipsDialog()}>tips</Button>
                        <ContentDialog 
                            open={this.state.tipsDialogOpen} 
                            onClose={() => this.closeTipsDialog()} 
                            title="Hoe vind ik de beheerder?"
                            content={tipsContent}
                            />
                        { !(isUserManagerOfPlayground(user, playground)) &&
                        <div>
                            <br /><br />
                            <Button 
                                variant="contained" size="small" color="primary" 
                                disabled={!user}
                                onClick={() => this.props.claimManagerRole(playground.id)}
                            >
                                Ik ben de beheerder van deze speeltuin
                            </Button>
                        </div>
                        }
                    </div>
                }
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvolveManagerCard)

