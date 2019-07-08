import gql from 'graphql-tag';
import { executeQuery, GRAPHQL_QUERY, GRAPHQL_MUTATION } from '../../api/QueryActions';

export const GET_ADMIN_JOB = 'GET_ADMIN_JOB'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const CHECK_EMAIL_EXISTS = 'CHECK_EMAIL_EXISTS'
export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE'
export const DELETE_USER_PROFILE = 'DELETE_USER_PROFILE'
export const SET_NOTIFICATION_LEVEL = 'SET_NOTIFICATION_LEVEL'
export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'
export const USER_REFRESHED = 'USER_REFRESHED'

export const USER_PROFILE_STREAM = 'USERPROFILE'



// const startUserProfileStream = () => {
//   return startStream(
//     USER_PROFILE_STREAM, 
//     {
//       type: GRAPHQL_QUERY,
//       baseActionIdentifier: GET_USER_PROFILE,
//       query: gql`
//       {
//           profile {
//               id
//               username
//               emailAddress
//               notificationLevel
//               initiativeMemberships
//           }
//       }
//     `, 
//       onSuccessPrepublish: (result, dispatch) => {
//         if (!result.profile && result.status !== 'not_modified') {
//           dispatch(openErrorDialog(
//             'Gebruikersprofiel niet aanwezig', 
//             'Er heeft zich een probleem voorgedaan met uw gebruikersprofiel. Probeer opnieuw in te loggen.', 
//             'OK', 
//             () => dispatch(signOutUser()))
//           )
//           return true   // terminate event execution
//         }
//       }
//     }
//     ,
//     {
//       pollingIntervalSetter: pollingIntervalSetterFactory(60, 120, 10)
//     }
//   )
// }

export const retrieveAdminCommand = () => executeQuery( {
    type: GRAPHQL_QUERY,
    baseActionIdentifier: GET_ADMIN_JOB, 
    query: gql`
    {
      adminCommand {
        commandIdentifier
        comment
        operatorEmail
        inputParameters
      }
    }
  `, 
  })
