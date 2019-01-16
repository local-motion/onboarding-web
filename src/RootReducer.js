import chatReducer from "./components/Chatbox/reducers/ChatReducer";
import { PUBLISH_ENVIRONMENT, PUBLISH_GRAPHQLCLIENT } from "./GlobalActions";
import { errorReducer } from "./api/ErrorReducer";
import { loadingReducer } from "./api/LoadingReducer";
import playgroundReducer from "./components/Playground/PlaygroundReducer";

const rootReducer = (state = {}, action) => {
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
        chat:     chatReducer(state.chat, action),
        playgrounds: playgroundReducer(state.playgrounds, action),
        loading:  loadingReducer(state.loading, action),
        error:    errorReducer(state.error, action),
        })
  }
}
  export default rootReducer