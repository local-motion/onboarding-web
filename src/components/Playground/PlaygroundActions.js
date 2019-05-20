import gql from 'graphql-tag';
import { startGraphQLStream, stopStream, triggerStream } from '../../api/StreamActions';
import { executeQuery } from '../../api/QueryActions';
import { generateUuid } from '../../utils/Generics';


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
      smokeFreeDate
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

export const findPlaygroundsByName = ({ initiativeName, playgrounds }) => {
    if (!initiativeName || !playgrounds.length) return null;

    const nameId = initiativeName.slice(-4);
    const normalizedNameArray = initiativeName.replace(/-/g, ' ').split(' ');

    const playground = playgrounds
      .find(({ id, name }) => name.toLowerCase().includes(normalizedNameArray[0]) && id.includes(nameId));

    return playground;
};

export const slugifyPlaygroundName = ({ id, name }) => {
    const nameId = id.slice(9, 13);
    const sluggedName = name.toLowerCase().replace(/ /g, '-');

    return `${sluggedName}-${nameId}`;
};

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
    const initiativeId = generateUuid()
    return executeQuery( {
      type: 'GRAPHQL_MUTATION',
      baseActionIdentifier: CREATE_INITIATIVE, 
      fetchId: initiativeId,
      query: gql`
        mutation CreateInitiative($input: CreateInitiativeInput!) {
            createInitiative(input: $input) {
              id
            }
        }
      `, 
      variables: {
        input: {
          initiativeId,
          name,
          lat,
          lng,
        }
      },
      onSuccess: (data, dispatch, getState) => {
        dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
        onSuccessCallback(data)
      }
    })
  }
    
export const joinInitiative = initiativeId => executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: JOIN_INITIATIVE, 
    fetchId: initiativeId,
    query: gql`
      mutation JoinInitiative($input: JoinInitiativeInput!) {
          joinInitiative(input: $input) {
            id
          }
      }
    `, 
    variables: {
      input: {
        initiativeId,
      }
    },
    onSuccess: triggerPlaygroundDetailsStream(initiativeId)
  })
    
export const claimManagerRole = initiativeId => executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: CLAIM_MANAGER_ROLE, 
    fetchId: initiativeId,
    query: gql`
      mutation ClaimManagerRole($input: ClaimManagerRoleCommand!) {
        claimManagerRole(input: $input) {
          id
        }
      }
    `, 
    variables: {
      input: {
        initiativeId,
      }
    },
    onSuccess: triggerPlaygroundDetailsStream(initiativeId)
  })

export const setSmokefreeDate = (initiativeId, smokeFreeDate) => executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: SET_SMOKEFREE_DATE, 
    fetchId: initiativeId,
    query: gql`
      mutation CommitToSmokeFreeDate($input: CommitToSmokeFreeDateCommand!) {
          commitToSmokeFreeDate(input: $input) {
              id
          }
      }
    `, 
    variables: {
      input: {
        initiativeId,
        smokeFreeDate
      }
    },
    onSuccess: triggerPlaygroundDetailsStream(initiativeId)
  })
    
export const setDecideSmokefree = initiativeId => executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: SET_DECIDE_SMOKEFREE, 
    fetchId: initiativeId,
    query: gql`
      mutation DecideToBecomeSmokeFree($input: DecideToBecomeSmokeFreeCommand!) {
        decideToBecomeSmokeFree(input: $input) {
          id
        }
      }
    `, 
    variables: {
      input: {
        initiativeId,
      }
    },
    onSuccess: triggerPlaygroundDetailsStream(initiativeId)
  })
   
export const recordPlaygroundObservation = (initiativeId, smokefree, comment, user) => executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: RECORD_PLAYGROUND_OBSERVATION, 
    fetchId: initiativeId,
    query: gql`
      mutation RecordPlaygroundObservation($input: RecordPlaygroundObservationCommand!) {
        recordPlaygroundObservation(input: $input) {
          id
        }
      }
    `, 
    variables: {
      input: {
        initiativeId,
        observer: user.id,
        smokefree,
        comment
        }
    },
    onSuccess: triggerPlaygroundDetailsStream(initiativeId)
  })

export const setCheckbox = (initiativeId, checklistItem, checked, user) => executeQuery( {
    type: 'GRAPHQL_MUTATION',
    baseActionIdentifier: SET_CHECKBOX, 
    fetchId: initiativeId,
    query: gql`
      mutation UpdateChecklist($input: UpdateChecklistCommand!) {
        updateChecklist(input: $input) {
          id
        }
      }
    `, 
    variables: {
      input: {
        initiativeId,
        checklistItem,
        checked
        }
    },
    onSuccess: triggerPlaygroundDetailsStream(initiativeId)
  })

  // utilities
const triggerPlaygroundDetailsStream = initiativeId => 
        (data, dispatch, getState) => dispatch(triggerStream(PLAYGROUND_DETAILS_STREAM + initiativeId))
