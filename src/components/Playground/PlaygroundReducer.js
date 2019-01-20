import { GET_PLAYGROUNDS, CREATE_INITIATIVE, GET_PLAYGROUND_DETAILS, JOIN_INITIATIVE } from "./PlaygroundActions";
import { SUCCESS_POSTFIX } from "../../GlobalActions";


// State definition

const initialState = {
  playgrounds: [],          // All playgrounds in the platform, with some overview parameters set
  playgroundDetails: {}     // Map on playground id (prefixed with a 'P' and with the dashes ('-') converted to underscores ('_') containing all details of the playground, retrieved on request)
}

// The playground object has this structure:
/*
    {
        id: [guid, string]
        name: [string]
        lat: [latitude, float]
        lng: [longitude, float]
        vol: [volunteer count, integer]
        votes: [nr of signed petitions, integer]
        status:  ["not_started|"in_progress"|"finished"]
        smokeFreeDate: [timestamp]
        managers: [array of {id: [string], username: [string]} ]
    }
}
*/



// Selectors

export const getAllPlaygrounds = (state) => state.playgrounds.playgrounds
export const getPlaygroundDetails = (state, playgroundId) => state.playgrounds.playgroundDetails[playgroundIdToKey(playgroundId)]

/// The statistics selector returns a structure like this:
/*
  {
    progress: {
      smokeFree: {
        count: [integer]
        percentage: [integer 0-100]
      }
      workingOnIt {
        count: [integer]
        percentage: [integer 0-100]
      }
      smoking {
        count: [integer]
        percentage: [integer 0-100]
      }
    }
  }
*/
export const getStatistics = (state) => {
  const playgrounds = state.playgrounds.playgrounds
  var smokeFreeCount = 0
  var workingOnItCount = 0
  var smokingCount = 0

  for (var i = 0; i < playgrounds.length; i++) {
    smokeFreeCount    += playgrounds[i].status === "finished"     ?  1 : 0;
    workingOnItCount  += playgrounds[i].status === "in_progress"  ?  1 : 0;
    smokingCount      += playgrounds[i].status === "not_started"  ?  1 : 0;
  }

  return  {
    progress: {
      smokeFree: {
        count: smokeFreeCount,
        percentage: smokeFreeCount === 0 ? 0 : Math.round(smokeFreeCount*100/playgrounds.length)
      },
      workingOnIt: {
        count: workingOnItCount,
        percentage: workingOnItCount === 0 ? 0 : Math.round(workingOnItCount*100/playgrounds.length)
      },
      smoking: {
        count: smokingCount,
        percentage: smokingCount === 0 ? 0 : Math.round(smokingCount*100/playgrounds.length)
      },
    }
  }
}


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

    case JOIN_INITIATIVE + SUCCESS_POSTFIX:
      return {
        ...state,
        playgrounds: updatePlaygrounds(state.playgrounds, action.payload.data.joinInitiative)
      }

    default:
      return state
  }
}

export default playgroundReducer

// Helper functions

const playgroundIdToKey = (playgroundId) => 'P' + playgroundId.replace('-', '_')

const updatePlaygrounds = (playgrounds, updatedPlayground) => 
                            playgrounds.map(playground => playground.id === updatedPlayground.id ? updatedPlayground : playground)
