import gql from 'graphql-tag';
import { startGraphQLStream, stopStream, triggerStream } from '../../api/StreamActions';
import { executeQuery } from '../../api/QueryActions';


export const GET_PLAYGROUNDS = 'GET_PLAYGROUNDS'
export const REQUIRE_PLAYGROUND_DETAILS = 'REQUIRE_PLAYGROUND_DETAILS'
export const GET_PLAYGROUND_DETAILS = 'GET_PLAYGROUND_DETAILS'

export const CREATE_INITIATIVE = 'CREATE_INITIATIVE'
export const JOIN_INITIATIVE = 'JOIN_INITIATIVE'
export const CLAIM_MANAGER_ROLE = 'CLAIM_MANAGER_ROLE'
export const SET_SMOKEFREE_DATE = 'SET_SMOKEFREE_DATE'
export const SET_DECIDE_SMOKEFREE = 'SET_DECIDE_SMOKEFREE'
export const RECORD_PLAYGROUND_OBSERVATION = 'RECORD_PLAYGROUND_OBSERVATION'
export const SET_CHECKBOX = 'SET_CHECKBOX'

// Stream identifiers (and/or prefixes)
export const PLAYGROUNDS_STREAM = 'PLAYGROUNDS'
export const PLAYGROUND_DETAILS_STREAM = 'PLAYGROUND_DETAILS_'


const getPlaygroundsQuery = gql`
  {
    playgrounds {
      id
      name
      lng
      lat
      status
      volunteerCount
      votes
    }
    totalVolunteers
  }
`
// TODO: this query fails on the server on the lastUpdateTimestamp field. Requires investigation.
//
// const getPlaygroundDetailsQuery = gql`
//     query Query($playgroundId: String!) {
//         playground(id: $playgroundId) {
//             id
//             name
//             lng
//             lat
//             status
//             smokeFreeDate
//             volunteerCount
//             votes
//             jointChecklistItems
//             ownChecklistItems
//             playgroundObservations {
//               observerId
//               observerName
//               smokefree
//               observationDate
//               comment
//             }
//             managers {
//                 id
//                 username
//             }
//             volunteers {
//                 userId
//                 userName
//             }
//             lastUpdateTimestamp
//         }
//     }
// `


const getPlaygroundDetailsQuery = gql`
    query Query($playgroundId: String!) {
        playground(id: $playgroundId) {
            id
            name
            lng
            lat
            status
            smokeFreeDate
            volunteerCount
            votes
            jointChecklistItems
            ownChecklistItems
            playgroundObservations {
              observerId
              observerName
              smokefree
              observationDate
              comment
            }
            managers {
                id
                username
            }
            volunteers {
                userId
                userName
            }
        }
    }
`

const createInitiativeQuery = gql`
    mutation CreateInitiative($input: CreateInitiativeInput!) {
        createInitiative(input: $input) {
          id
        }
    }
`

const joinInitiativeQuery = gql`
    mutation JoinInitiative($input: JoinInitiativeInput!) {
        joinInitiative(input: $input) {
          id
        }
    }
`

const claimManagerRoleQuery = gql`
  mutation ClaimManagerRole($input: ClaimManagerRoleCommand!) {
    claimManagerRole(input: $input) {
      id
    }
  }
`
const setSmokefreeDateQuery = gql`
    mutation CommitToSmokeFreeDate($input: CommitToSmokeFreeDateCommand!) {
        commitToSmokeFreeDate(input: $input) {
            id
        }
    }
`

const setDecideSmokefreeQuery = gql`
  mutation DecideToBecomeSmokeFree($input: DecideToBecomeSmokeFreeCommand!) {
    decideToBecomeSmokeFree(input: $input) {
      id
    }
  }
`

const recordPlaygroundObservationQuery = gql`
  mutation RecordPlaygroundObservation($input: RecordPlaygroundObservationCommand!) {
    recordPlaygroundObservation(input: $input) {
      id
    }
  }
`

const updateCheckboxQuery = gql`
  mutation UpdateChecklist($input: UpdateChecklistCommand!) {
    updateChecklist(input: $input) {
      id
    }
  }
`


export const ensurePlaygrounds = () => {
  return startGraphQLStream(PLAYGROUNDS_STREAM, GET_PLAYGROUNDS, getPlaygroundsQuery)
}

export const ensurePlaygroundDetails = (playgroundId) => {
  return startGraphQLStream(PLAYGROUND_DETAILS_STREAM + playgroundId, GET_PLAYGROUND_DETAILS, getPlaygroundDetailsQuery, {playgroundId})
}

export const stopPlaygroundDetailsStream = (playgroundId) => {
  return stopStream(PLAYGROUND_DETAILS_STREAM + playgroundId)
}


export const createInitiative = (name, lat, lng, onSuccessCallback) => {
  const initiativeId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // generate a uuid
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
    return v.toString(16);
    })

    return executeQuery( {
      type: 'GRAPHQL_MUTATION',
      baseActionIdentifier: CREATE_INITIATIVE, 
      fetchId: initiativeId,
      query: createInitiativeQuery, 
      variables: {
        input: {
          initiativeId,
          name,
          lat,
          lng,
          type: "smokefree",
          status: "not_started",
        }
      },
      onSuccess: (data, dispatch, getState) => {
        dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
        onSuccessCallback(data)
      }
    })
  }
    
export const joinInitiative = initiativeId => {
  return executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: JOIN_INITIATIVE, 
    fetchId: initiativeId,
    query: joinInitiativeQuery, 
    variables: {
      input: {
        initiativeId,
      }
    },
    onSuccess: (data, dispatch, getState) => dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
  })
}
    
export const claimManagerRole = initiativeId => {
  return executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: CLAIM_MANAGER_ROLE, 
    fetchId: initiativeId,
    query: claimManagerRoleQuery, 
    variables: {
      input: {
        initiativeId,
      }
    },
    onSuccess: (data, dispatch, getState) => dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
  })
}

export const setSmokefreeDate = (initiativeId, smokeFreeDate) => {
  return executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: SET_SMOKEFREE_DATE, 
    fetchId: initiativeId,
    query: setSmokefreeDateQuery, 
    variables: {
      input: {
        initiativeId,
        smokeFreeDate
      }
    },
    onSuccess: (data, dispatch, getState) => dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
  })
}
    
export const setDecideSmokefree = initiativeId => {
  return executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: SET_DECIDE_SMOKEFREE, 
    fetchId: initiativeId,
    query: setDecideSmokefreeQuery, 
    variables: {
      input: {
        initiativeId,
      }
    },
    onSuccess: (data, dispatch, getState) => dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
  })
}
   
export const recordPlaygroundObservation = (initiativeId, smokefree, comment, user) => {
  return executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: RECORD_PLAYGROUND_OBSERVATION, 
    fetchId: initiativeId,
    query: recordPlaygroundObservationQuery, 
    variables: {
      input: {
        initiativeId,
        observer: user.id,
        smokefree,
        comment
        }
    },
    onSuccess: (data, dispatch, getState) => dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
  })
}

export const setCheckbox = (initiativeId, checklistItem, checked, user) => {
  return executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: SET_CHECKBOX, 
    fetchId: initiativeId,
    query: updateCheckboxQuery, 
    variables: {
      input: {
        initiativeId,
        actor: user.id,
        checklistItem,
        checked
        }
    },
    onSuccess: (data, dispatch, getState) => dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
  })
}
