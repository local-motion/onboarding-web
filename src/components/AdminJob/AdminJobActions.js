import gql from 'graphql-tag';
import { executeQuery, GRAPHQL_QUERY, GRAPHQL_MUTATION } from '../../api/QueryActions';

export const GET_ADMIN_COMMAND = 'GET_ADMIN_COMMAND'
export const DELETE_ADMIN_COMMAND = 'DELETE_ADMIN_COMMAND'
export const RUN_ADMIN_JOB = 'RUN_ADMIN_JOB'


export const retrieveAdminCommand = () => executeQuery( {
  type: GRAPHQL_QUERY,
  baseActionIdentifier: GET_ADMIN_COMMAND, 
  query: gql`
  {
    adminCommand {
      commandIdentifier
      comment
      operatorEmail
      inputParameters
      validationCode
    }
  }
`, 
})

export const runAdminJob = (validationCode, retainCommandFile) => executeQuery( {
  type: GRAPHQL_MUTATION,
  baseActionIdentifier: RUN_ADMIN_JOB,
  query: gql`
    mutation RunAdminJob($input: RunAdminJobInput!) {
      runAdminJob(input: $input) {
          resultCode
          message
          result
        }
    }
  `, 
  variables: {
    input: {
      validationCode,
      retainCommandFile,
    }
  },
})

export const deleteAdminCommand = () => executeQuery( {
  type: GRAPHQL_MUTATION,
  baseActionIdentifier: DELETE_ADMIN_COMMAND, 

// Passing in 'irrelevant' to the input parameter as GraphQL apparantly does not support mutations without input parameters
  query: gql`
    mutation DeleteAdminCommand {
      deleteAdminCommand(doesNotMatter: "irrelevant") {
        id
      }
    }
  `, 
  onSuccess: (data, dispatch, getState) => {
    dispatch(retrieveAdminCommand())
  }
})