import { GET_PLAYGROUNDS, CREATE_INITIATIVE, GET_PLAYGROUND_DETAILS, JOIN_INITIATIVE, CLAIM_MANAGER_ROLE, SET_SMOKEFREE_DATE, SET_DECIDE_SMOKEFREE, SET_CHECKBOX } from "./PlaygroundActions";
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
export const isUserManagerOfPlayground = (user, playground) => playground.managers.filter(manager => manager.id === user.id).length > 0


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
      {
        const userProfile = getUser(baseState)
        console.log("userprofile: ", userProfile)
        const playground = action.payload.data.joinInitiative

        var userListedAsVolunteer = false
        for (let i = 0; i < playground.volunteers.length; i++)
          userListedAsVolunteer |= playground.volunteers[i].userId === userProfile.id
  
        if (!userListedAsVolunteer) {
          playground.volunteers.push({userId: userProfile.id, userName: userProfile.name})
          playground.volunteerCount++
        }

        console.log("volunteer joined, integrating: ", playground)

        return {
          ...state,
          playgroundDetails: updatePlaygroundDetails(state.playgroundDetails, playground),
        }
      }

    case CLAIM_MANAGER_ROLE + SUCCESS_POSTFIX:
      // Because of the async nature of Axon, the result will often not yet contain the user as a manager. So (for now) we need to fix this here.
      const userProfile = action.miscAttributes.userProfile
      console.log("userprofile:")
      console.log(userProfile)
      const playground = action.payload.data.claimManagerRole
      var userListedAsManager = false
      for (let i = 0; i < playground.managers.length; i++)
        userListedAsManager |= playground.managers[i].id === userProfile.id

      if (!userListedAsManager)
        playground.managers.push(userProfile)

      return {
        ...state,
        playgroundDetails: updatePlaygroundDetails(state.playgroundDetails, playground),
      }

      case SET_SMOKEFREE_DATE + SUCCESS_POSTFIX:
        {
        const playground = state.playgroundDetails[playgroundIdToKey(action.variables.input.initiativeId)]
        if (playground) {
          const updatedPlayground = {...playground, smokeFreeDate: action.variables.input.smokeFreeDate, status: 'finished'}
          const updatedPlaygroundSummary = {...getPlaygroundSummary(state.playgrounds, playground.id), status: 'finished'}
          return {
            ...state,
            playgroundDetails: updatePlaygroundDetails(state.playgroundDetails, updatedPlayground),
            playgrounds: updatePlaygrounds(state.playgrounds, updatedPlaygroundSummary)
          }
        }
        else
          return state
        }
        
      case SET_DECIDE_SMOKEFREE + SUCCESS_POSTFIX:
        {
        const playground = state.playgroundDetails[playgroundIdToKey(action.variables.input.initiativeId)]
        if (playground && playground.status === 'not_started') {
          const updatedPlayground = {...playground, status: 'in_progress'}
          const updatedPlaygroundSummary = {...getPlaygroundSummary(state.playgrounds, playground.id), status: 'in_progress'}
          return {
            ...state,
            playgroundDetails: updatePlaygroundDetails(state.playgroundDetails, updatedPlayground),
            playgrounds: updatePlaygrounds(state.playgrounds, updatedPlaygroundSummary)
          }
        }
        else
          return state
        }

      case SET_CHECKBOX + SUCCESS_POSTFIX:
        {
        const playground = state.playgroundDetails[playgroundIdToKey(action.variables.input.initiativeId)]
        if (playground) {
          const checklistItem = action.variables.input.checklistItem
          const checked = action.variables.input.checked
          const jointChecklistItems = playground.jointChecklistItems.filter(item => item !== checklistItem)
          const ownChecklistItems = playground.ownChecklistItems.filter(item => item !== checklistItem)
          if (checked) {
            jointChecklistItems.push(checklistItem)
            ownChecklistItems.push(checklistItem)
          }
          const updatedPlayground = {...playground, jointChecklistItems, ownChecklistItems}
          return {
            ...state,
            playgroundDetails: updatePlaygroundDetails(state.playgroundDetails, updatedPlayground),
          }
        }
        else
          return state
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
      smokeFreeDate: updatedPlayground.smokeFreeDate ? new Date(updatedPlayground.smokeFreeDate) : null   // TODO check why this conversion is required
    }
  return newPlaygroundDetails
}

const getPlaygroundSummary = (playgrounds, id) => {
  for (var i = 0; i < playgrounds.length; i++)
    if (playgrounds[i].id === id)
      return playgrounds[i]
  return null
}