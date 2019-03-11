import chatReducer from "./components/Chatbox/reducers/ChatReducer";
import { PUBLISH_ENVIRONMENT, PUBLISH_GRAPHQLCLIENT } from "./GlobalActions";
import { errorReducer } from "./api/ErrorReducer";
import { loadingReducer } from "./api/LoadingReducer";
import playgroundReducer from "./components/Playground/PlaygroundReducer";
import { fetchDetailsReducer } from "./api/FetchDetailsReducer";
import userProfileReducer from "./components/UserProfile/UserProfileReducer";
import confirmationDialogReducer from "./components/ConfirmationDialog/ConfirmationDialogReducer";
import { apiReducer } from "./api/ApiReducer";

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
        userprofile:        userProfileReducer(state.userprofile, action),
        chat:               chatReducer(state.chat, action),
        playgrounds:        playgroundReducer(state.playgrounds, action, state),
        api:                apiReducer(state.api, action, state),
        loading:            loadingReducer(state.loading, action),
        error:              errorReducer(state.error, action),
        confirmationdialog: confirmationDialogReducer(state.confirmationdialog, action),
        fetchDetails:       fetchDetailsReducer(state.fetchDetails, action)
        })
  }
}
  export default rootReducer