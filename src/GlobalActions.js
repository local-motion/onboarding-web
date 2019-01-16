import gql from 'graphql-tag';


export const PUBLISH_ENVIRONMENT = 'PUBLISH_ENVIRONMENT'
export const PUBLISH_GRAPHQLCLIENT = 'PUBLISH_GRAPHQLCLIENT'

export const publishEnvironment = environmentProperties => (
    {type: PUBLISH_ENVIRONMENT, environmentProperties}
  )

export const publishGraphQLClient = client => (
    {type: PUBLISH_GRAPHQLCLIENT, client}
  )


  const GET_PLAYGROUNDS = gql`
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
  }
`;






export const fetchPlaygrounds = () => {
  return (dispatch, getState) => {
      const graphQLClient = getState().graphQLClient;
      dispatch({type: 'GET_PLAYGROUNDS_REQUEST'})

      return graphQLClient.query({
        query: GET_PLAYGROUNDS
      })
        .then(data => dispatch({ type: 'GET_PLAYGROUNDS_SUCCESS', payload: data }))
        .catch(error => dispatch({ type: 'GET_PLAYGROUNDS_FAILURE', payload: error, error: true }));
      
    }
  }




