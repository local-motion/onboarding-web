
export const PUBLISH_ENVIRONMENT = 'PUBLISH_ENVIRONMENT'
export const PUBLISH_GRAPHQLCLIENT = 'PUBLISH_GRAPHQLCLIENT'


export const publishEnvironment = environmentProperties => (
    {type: PUBLISH_ENVIRONMENT, environmentProperties}
  )

export const publishGraphQLClient = client => (
    {type: PUBLISH_GRAPHQLCLIENT, client}
  )

