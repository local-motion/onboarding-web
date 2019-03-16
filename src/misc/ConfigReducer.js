import { PUBLISH_ENVIRONMENT, PUBLISH_GRAPHQLCLIENT, PUBLISH_API_BASE_URL } from "./ConfigActions";

// State definition

const initialState = {
  // environmentProperties:     set of various environment properties
  // apiBaseUrl:                base path (incl scheme) of the LocalMotion api's
  // graphQLClient:             client to be used for doing graphQL calls
}


// Selectors

export const getGraphQLClient = (state) => state.config.graphQLClient
export const getEnvironmentProperties = (state) => state.config.environmentProperties
export const getApiBaseUrl = (state) => state.config.apiBaseUrl


// Reducer

const configReducer = (state = initialState, action) => {
  switch (action.type) {

    case PUBLISH_ENVIRONMENT:
      return {
        ...state,
        environmentProperties: action.environmentProperties
      }

    case PUBLISH_API_BASE_URL:
      return {
        ...state,
        apiBaseUrl: action.url
      }

    case PUBLISH_GRAPHQLCLIENT:
      return {
        ...state,
        graphQLClient: action.client
      }

    default:
      return state
  }
}

export default configReducer
