import { NAVIGATE_TO } from "./NavigationActions";
import { SUCCESS_POSTFIX } from "../GlobalActions";
import { CREATE_INITIATIVE } from "../components/Playground/PlaygroundActions";

const navigationReducer = (state = {location: ''}, action) => {
  switch (action.type) {
    case NAVIGATE_TO:
      return {
        location: action.location
      }
      case CREATE_INITIATIVE + SUCCESS_POSTFIX:
      console.log('navigation reducer reducing:')
      console.log(action)
      return {
        location: '/workspace/' + action.payload.data.createInitiative.id
      }
    default:
      return state
  }
}

export default navigationReducer