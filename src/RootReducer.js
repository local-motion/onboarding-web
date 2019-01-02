import chatReducer from "components/Chatbox/reducers/ChatReducer";

const rootReducer = (state = {}, action) => ({
    chat: chatReducer(state.chat, action),
  })
  
  export default rootReducer