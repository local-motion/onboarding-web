
export const PUBLISH_ENVIRONMENT = 'PUBLISH_ENVIRONMENT'
export const PUBLISH_API_BASE_URL = 'PUBLISH_API_BASE_URL'
export const PUBLISH_GRAPHQLCLIENT = 'PUBLISH_GRAPHQLCLIENT'


export const publishApiBaseURL = url => (
    {type: PUBLISH_API_BASE_URL, url}
  )

export const publishGraphQLClient = client => (
    {type: PUBLISH_GRAPHQLCLIENT, client}
  )

