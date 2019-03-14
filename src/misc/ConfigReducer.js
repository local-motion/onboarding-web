import { PUBLISH_ENVIRONMENT, PUBLISH_GRAPHQLCLIENT } from "./ConfigActions";

// State definition

const initialState = {
  // environmentProperties:     set of various environment properties
  // graphQLClient:             client to be used for doing graphQL calls
}


// Selectors

export const getGraphQLClient= (state) => state.config.graphQLClient
export const getEnvironmentProperties= (state) => state.config.environmentProperties


// Reducer

const configReducer = (state = initialState, action) => {
  switch (action.type) {

    case PUBLISH_ENVIRONMENT:
      return {
        ...state,
        environmentProperties: action.environmentProperties
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
