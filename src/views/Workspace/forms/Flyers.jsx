import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { connect } from 'react-redux'
import { setCheckbox } from "../../../components/Playground/PlaygroundActions";


const mapStateToProps = state => ( {} )

const mapDispatchToProps = dispatch => ({
    setCheckbox: (initiativeId, checklistItem, isChecked, user) => dispatch(setCheckbox(initiativeId, checklistItem, isChecked, user)),
})


class Flyers extends React.Component {

    onCheckboxClick(checklistItem) {
        // alert('je klikte ' + checkbox)
        const {setCheckbox, playground, user} = this.props
        if (playground && user) {
            const currentState  = playground.jointChecklistItems.includes(checklistItem)
            setCheckbox(playground.id, checklistItem, !currentState, user)
        }
    }

    render() {
        const {playground, user} = this.props

        return (
            <div>
                <Button disabled={!user} size="small" color="primary" 
                    href={
                        "mailto:service@longfonds.nl?" + 
                        "subject=Flyers%20bestellen&" + 
                        "body=Hallo,%0A" + 
                        "Ik%20wil%20graag%20flyers%20bestellen%20voor%20speeltuin%20" + playground.name + ".%0A" +
                        "Mijn%20adres%20is%20...%20VUL%20HIER%20JE%20ADRESGEGEVENS%20IN%20..."
                    }
                    >
                     Bestel flyers
                </Button>

                <br />
                <FormControlLabel control={<Checkbox checked={playground.jointChecklistItems.includes('order_flyers')} onChange={() => this.onCheckboxClick('order_flyers')}/>} label="De flyers zijn besteld" />
    
                <br /><br />
                Ga nu samen de flyers uitdelen in de buurt.

                <br />
                <FormControlLabel control={<Checkbox value="checkedC" onChange={() => this.onCheckboxClick('unc')}/>} label="De flyers zijn uitgedeeld" />
            </div>
        );
    }
}


export default withStyles(componentsStyle)(connect(mapStateToProps, mapDispatchToProps)(Flyers));
