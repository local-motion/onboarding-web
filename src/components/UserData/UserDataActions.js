import gql from 'graphql-tag';
import { executeQuery, GRAPHQL_QUERY, GRAPHQL_MUTATION } from '../../api/QueryActions';
import { triggerStream, startStream, pollingIntervalSetterFactory } from 'api/StreamActions';

export const GET_USER_DATA = 'GET_USER_DATA'
export const SET_LAST_AUDIT_TRAIL_VIEW = 'SET_LAST_AUDIT_TRAIL_VIEW'

export const USER_DATA_STREAM = 'USERDATA'



export const startUserDataStream = () => {
  return startStream(
    USER_DATA_STREAM, 
    {
      type: GRAPHQL_QUERY,
      baseActionIdentifier: GET_USER_DATA,
      query: gql`
      {
          userData {
            lastAuditTrailView
          }
      }
    `, 
      onSuccessPrepublish: (result, dispatch) => {

        console.log('result from user data stream:', result)

      }
    }
    ,
    {
      pollingIntervalSetter: pollingIntervalSetterFactory(60, 120, 10)
    }
  )
}

export const storeUserData = (userData) => executeQuery( {
  type: GRAPHQL_MUTATION,
  baseActionIdentifier: SET_LAST_AUDIT_TRAIL_VIEW, 
  query: gql`
    mutation storeUserData($input: UserDataInput!) {
      storeUserData(input: $input) {
          id
        }
    }
  `, 
  variables: {
    input: userData
  },
  onSuccess: (result, dispatch) => dispatch(triggerStream(USER_DATA_STREAM))
})

