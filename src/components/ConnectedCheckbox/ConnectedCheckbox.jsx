import React from 'react';
import { getUser } from '../UserProfile/UserProfileReducer';
import { connect } from 'react-redux'
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { setCheckbox } from '../Playground/PlaygroundActions';
import { isUserVolunteerOfPlayground } from '../Playground/PlaygroundReducer';

const mapStateToProps = state => ({
    user: getUser(state)
})

const mapDispatchToProps = dispatch => ({
    setCheckbox: (initiativeId, checklistItem, isChecked, user) => dispatch(setCheckbox(initiativeId, checklistItem, isChecked, user)),
})

/*
    Props:
    - playground
    - checklistItem
    - label
*/
class ConnectedCheckbox extends React.Component {

    onCheckboxClick() {
        const {setCheckbox, playground, checklistItem, user} = this.props
        const currentState  = playground.jointChecklistItems.includes(checklistItem)
        setCheckbox(playground.id, checklistItem, !currentState, user)
    }

    render() {
        const {playground, checklistItem, label, user} = this.props;

        return (
            <FormControlLabel
                control={
                    <Checkbox 
                        disabled={!isUserVolunteerOfPlayground(user, playground)} 
                        checked={playground.jointChecklistItems.includes(checklistItem)} 
                        onChange={() => this.onCheckboxClick()}
                    />
                }
                label={label} 
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedCheckbox)
