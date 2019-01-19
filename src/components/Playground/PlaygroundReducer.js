import { GET_PLAYGROUNDS, CREATE_INITIATIVE, GET_PLAYGROUND_DETAILS } from "./PlaygroundActions";
import { SUCCESS_POSTFIX } from "../../GlobalActions";


// State definition

const initialState = {
  playgrounds: [],          // All playgrounds in the platform, with some overview parameters set
  playgroundDetails: {}     // Map on playground id (prefixed with a 'P' and with the dashes ('-') converted to underscores ('_') containing all details of the playground, retrieved on request)
}


// Selectors

export const getAllPlaygrounds = (state) => state.playgrounds.playgrounds
export const getPlaygroundDetails = (state, playgroundId) => state.playgrounds.playgroundDetails[playgroundIdToKey(playgroundId)]


// Reducer

const playgroundReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYGROUNDS + SUCCESS_POSTFIX:
      return {
        ...state,
        playgrounds: action.payload.data.playgrounds,
      }

    case GET_PLAYGROUND_DETAILS + SUCCESS_POSTFIX:
      const newPlaygroundDetails = {...state.playgroundDetails}
      newPlaygroundDetails[playgroundIdToKey(action.payload.data.playground.id)] = 
        { 
          ...action.payload.data.playground, 
          smokeFreeDate: action.payload.data.playground.smokeFreeDate ? new Date(action.payload.data.playground.smokeFreeDate) : null
        }

      return {
        ...state,
        playgroundDetails: newPlaygroundDetails,
      }

    case CREATE_INITIATIVE + SUCCESS_POSTFIX:
      return {
        ...state,
        playgrounds: [action.payload.data.createInitiative, ...state.playgrounds],
      }

    default:
      return state
  }
}

export default playgroundReducer

// Helper functions

const playgroundIdToKey = (playgroundId) => 'P' + playgroundId.replace('-', '_')
