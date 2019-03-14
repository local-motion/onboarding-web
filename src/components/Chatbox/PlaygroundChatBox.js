import { connect } from 'react-redux'
import ChatBox from './views/ChatBox';
import { deactivateChatbox, activateChatbox, postChatMessage, editChatMessage } from './actions/chatActions';
import { isUserVolunteerOfPlayground } from '../Playground/PlaygroundReducer';
import { getUser } from '../UserProfile/UserProfileReducer';


const mapStateToProps = (state, ownProps) => ({
  chatMessages: state.chat.messages,
  messageText: state.chat.editText,
  chatDisabled: !isUserVolunteerOfPlayground(getUser(state), ownProps.playground),
  userName: getUser(state) && getUser(state).name
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmitHandler:    () =>     dispatch(postChatMessage()),
  onChangeHandler:    event =>  dispatch(editChatMessage(event.target.value)),
  setActiveChatbox:   () =>     dispatch(activateChatbox(ownProps.playground.id)),
deactivateChatbox:    () =>     dispatch(deactivateChatbox(ownProps.playground.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)
