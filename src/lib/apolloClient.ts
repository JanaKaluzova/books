import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${STRAPI_URL}/graphql` }),
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        keyFields: ['documentId'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

if (import.meta.env.DEV) {
  ;(window as unknown as { __APOLLO_CLIENT__: typeof apolloClient }).__APOLLO_CLIENT__ =
    apolloClient
}
