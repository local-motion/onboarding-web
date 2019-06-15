import chatReducer from "./components/Chatbox/reducers/ChatReducer";
import { errorReducer } from "./api/ErrorReducer";
import { loadingReducer } from "./api/LoadingReducer";
import playgroundReducer from "./components/Playground/PlaygroundReducer";
import { fetchDetailsReducer } from "./api/FetchDetailsReducer";
import userProfileReducer from "./components/UserProfile/UserProfileReducer";
import simpleDialogReducer from "./components/SimpleDialog/SimpleDialogReducer";
import { streamReducer } from "./api/StreamReducer";
import configReducer from "./misc/ConfigReducer";
import auditTrailReducer from "components/AuditTrail/AuditTrailReducer";
import userDataReducer from "components/UserData/UserDataReducer";

const rootReducer = (state = {}, action) => ({
    ...state,
    config:             configReducer(state.config, action),
    userprofile:        userProfileReducer(state.userprofile, action),
    userdata:           userDataReducer(state.userdata, action),
    chat:               chatReducer(state.chat, action),
    playgrounds:        playgroundReducer(state.playgrounds, action, state),
    audittrail:         auditTrailReducer(state.audittrail, action, state),
    stream:             streamReducer(state.stream, action, state),
    loading:            loadingReducer(state.loading, action),
    error:              errorReducer(state.error, action),
    simpleDialog:       simpleDialogReducer(state.simpleDialog, action),
    fetchDetails:       fetchDetailsReducer(state.fetchDetails, action)
  })

export default rootReducer