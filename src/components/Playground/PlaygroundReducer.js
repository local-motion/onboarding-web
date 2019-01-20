import { GET_PLAYGROUNDS, CREATE_INITIATIVE, GET_PLAYGROUND_DETAILS, JOIN_INITIATIVE, CLAIM_MANAGER_ROLE } from "./PlaygroundActions";
import { SUCCESS_POSTFIX } from "../../GlobalActions";
import { getUserProfile } from "../UserProfile/UserProfileReducer";


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
        return {
        ...state,
        playgroundDetails: updatePlaygroundDetails(state.playgroundDetails, action.payload.data.playground),
      }


    case CREATE_INITIATIVE + SUCCESS_POSTFIX:
      return {
        ...state,
        playgrounds: [action.payload.data.createInitiative, ...state.playgrounds],
      }

    case JOIN_INITIATIVE + SUCCESS_POSTFIX:
      // TODO: Because of the async nature of Axon, the result will often not yet contain the user as a volunteer. So (for now) we need to fix this here.
      return {
        ...state,
        playgrounds: updatePlaygrounds(state.playgrounds, action.payload.data.joinInitiative)
      }

    case CLAIM_MANAGER_ROLE + SUCCESS_POSTFIX:
      // Because of the async nature of Axon, the result will often not yet contain the user as a manager. So (for now) we need to fix this here.
      const userProfile = action.miscAttributes.userProfile
      console.log("userprofile:")
      console.log(userProfile)
      const playground = action.payload.data.claimManagerRole
      var userListedAsManager = false
      for (var i = 0; i < playground.managers.length; i++)
        userListedAsManager |= playground.managers[i].id === userProfile.id

      if (!userListedAsManager)
        playground.managers.push(userProfile)

      return {
        ...state,
        playgroundDetails: updatePlaygroundDetails(state.playgroundDetails, playground),
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

const updatePlaygroundDetails = (playgroundDetails, updatedPlayground) => {
  const newPlaygroundDetails = {...playgroundDetails}
  newPlaygroundDetails[playgroundIdToKey(updatedPlayground.id)] = 
    { 
      ...updatedPlayground, 
      smokeFreeDate: updatedPlayground.smokeFreeDate ? new Date(updatedPlayground.smokeFreeDate) : null
    }
  return newPlaygroundDetails
}