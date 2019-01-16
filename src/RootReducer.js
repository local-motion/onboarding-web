import chatReducer from "./components/Chatbox/reducers/ChatReducer";
import { PUBLISH_ENVIRONMENT, PUBLISH_GRAPHQLCLIENT } from "./GlobalActions";
import { errorReducer } from "./api/ErrorReducer";
import { loadingReducer } from "./api/LoadingReducer";

const rootReducer = (state = {playgrounds: []}, action) => {
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
    case 'GET_PLAYGROUNDS_SUCCESS':
      console.log("received playground data in reducer:")
      console.log(action.payload)
      return {
        ...state,
        playgrounds: action.payload.data.playgrounds,
        loading:  loadingReducer(state.loading, action),
      }
    default:
      return  ({
        ...state,
        chat:     chatReducer(state.chat, action),
        loading:  loadingReducer(state.loading, action),
        error:    errorReducer(state.error, action),
        })
  }
}
  export default rootReducer