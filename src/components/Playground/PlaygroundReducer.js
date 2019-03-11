// import { GET_PLAYGROUNDS, CREATE_INITIATIVE, GET_PLAYGROUND_DETAILS, JOIN_INITIATIVE, CLAIM_MANAGER_ROLE, SET_SMOKEFREE_DATE, SET_DECIDE_SMOKEFREE, SET_CHECKBOX, RECORD_PLAYGROUND_OBSERVATION } from "./PlaygroundActions";
import { GET_PLAYGROUNDS, GET_PLAYGROUND_DETAILS } from "./PlaygroundActions";
import { SUCCESS_POSTFIX } from "../../GlobalActions";
import { getUser } from "../UserProfile/UserProfileReducer";


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
        volunteerCount: [volunteer count, integer]
        votes: [nr of signed petitions, integer]
        status:  ["not_started|"in_progress"|"finished"]
        smokeFreeDate: [timestamp]
        managers: [array of {id: [string], username: [string]} ]
        volunteers: [array of {userId: [string], userName: [string]} ]
        jointChecklistItems: [list of strings, each indicating a checklist items that is checked, view is playground as a whole, last checklist action determines the state]
        ownChecklistItems: [list of strings, each indicating a checklist items that is checked, view is the checks placed by the logged on user]
    }
}
*/



// Selectors

export const getAllPlaygrounds = (state) => state.playgrounds.playgrounds
export const getPlaygroundDetails = (state, playgroundId) => state.playgrounds.playgroundDetails[playgroundIdToKey(playgroundId)]
export const isCurrentUserManagerOfPlayground = (state, playgroundId) => isUserManagerOfPlayground(getUser(state), getPlaygroundDetails(state, playgroundId))

// Public utilities
export const isUserVolunteerOfPlayground = (user, playground) => playground && user && playground.volunteers.filter(volunteer => volunteer.userId === user.id).length > 0
export const isUserManagerOfPlayground   = (user, playground) => playground && user && playground.managers.filter(manager => manager.id === user.id).length > 0


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

const playgroundReducer = (state = initialState, action, baseState) => {
  switch (action.type) {
    case GET_PLAYGROUNDS + SUCCESS_POSTFIX:
      if (action.payload.status === 'not_modified')
      return state

      return {
        ...state,
        playgrounds: action.payload.playgrounds,
      }

    case GET_PLAYGROUND_DETAILS + SUCCESS_POSTFIX:
        if (action.payload.status === 'not_modified')
          return state

        return {
        ...state,
        playgroundDetails: updatePlaygroundDetails(state.playgroundDetails, action.payload.playground),
      }

      default:
        return state
  }
}

export default playgroundReducer

// Helper functions

const playgroundIdToKey = (playgroundId) => 'P' + playgroundId.replace('-', '_')

// const updatePlaygrounds = (playgrounds, updatedPlayground) => 
//                             playgrounds.map(playground => playground.id === updatedPlayground.id ? updatedPlayground : playground)

const updatePlaygroundDetails = (playgroundDetails, updatedPlayground) => {
  const newPlaygroundDetails = {...playgroundDetails}
  newPlaygroundDetails[playgroundIdToKey(updatedPlayground.id)] = 
    { 
      ...updatedPlayground, 
      smokeFreeDate: updatedPlayground.smokeFreeDate ? new Date(updatedPlayground.smokeFreeDate) : null   // TODO check why this conversion is required
    }
  return newPlaygroundDetails
}

// const getPlaygroundSummary = (playgrounds, id) => {
//   for (var i = 0; i < playgrounds.length; i++)
//     if (playgrounds[i].id === id)
//       return playgrounds[i]
//   return null
// }