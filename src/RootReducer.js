import chatReducer from "components/Chatbox/reducers/ChatReducer";
import { PUBLISH_ENVIRONMENT, PUBLISH_GRAPHQLCLIENT } from "GlobalActions";

const rootReducer = (state = {}, action) => {
  console.log("root reducer for: " + JSON.stringify(action))
  console.log(action)
  switch (action.type) {
    case PUBLISH_ENVIRONMENT:
      return {
        ...state,
        environmentProperties: action.environmentProperties
      }
    case PUBLISH_GRAPHQLCLIENT:
      return {
        ...state,
        graphQLClient: action.client
      }
    default:
      return  ({
        ...state,
        chat: chatReducer(state.chat, action),
      })
  }
}
  export default rootReducer