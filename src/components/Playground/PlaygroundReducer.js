import { GET_PLAYGROUNDS } from "./PlaygroundActions";
import { SUCCESS_POSTFIX } from "../../GlobalActions";

const playgroundReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PLAYGROUNDS + SUCCESS_POSTFIX:
      return action.payload.data.playgrounds
    default:
      return state
  }
}

export default playgroundReducer