import { GET_PLAYGROUNDS, CREATE_INITIATIVE } from "./PlaygroundActions";
import { SUCCESS_POSTFIX } from "../../GlobalActions";

const playgroundReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PLAYGROUNDS + SUCCESS_POSTFIX:
      return action.payload.data.playgrounds
    case CREATE_INITIATIVE + SUCCESS_POSTFIX:
      return [action.payload.data.createInitiative, ...state]
    default:
      return state
  }
}

export default playgroundReducer