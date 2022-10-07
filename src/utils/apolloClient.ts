import { createAuthLink, AuthOptions } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client/core'

import appSyncConfig from '../aws-exports'

const url = appSyncConfig.aws_appsync_graphqlEndpoint
const region = appSyncConfig.aws_appsync_region
const auth: AuthOptions = {
  type: 'API_KEY',
  apiKey: appSyncConfig.aws_appsync_apiKey,
}

export const useApolloClient = () => {
  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }),
  ])

  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  return apolloClient
}
