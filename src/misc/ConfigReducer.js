import { PUBLISH_ENVIRONMENT, PUBLISH_GRAPHQLCLIENT, PUBLISH_API_BASE_URL } from "./ConfigActions";
import { SUCCESS_POSTFIX } from "../api/QueryActions";

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
export const getGoogleMapsKey = (state) => state.config.environmentProperties.googleMapsKey


// Reducer

const configReducer = (state = initialState, action) => {
  switch (action.type) {

    case PUBLISH_ENVIRONMENT + SUCCESS_POSTFIX:
      return {
        ...state,
        environmentProperties: action.payload
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
