import chatReducer from "components/Chatbox/reducers/ChatReducer";
import { PUBLISH_ENVIRONMENT } from "GlobalActions";

const rootReducer = (state = {}, action) => {
  console.log("root reducer for: " + JSON.stringify(action))
  console.log(action)
  switch (action.type) {
    case PUBLISH_ENVIRONMENT:
      return {
        ...state,
        environmentProperties: action.environmentProperties
      }
    default:
      return  ({
        ...state,
        chat: chatReducer(state.chat, action),
      })
  }
}
  export default rootReducer