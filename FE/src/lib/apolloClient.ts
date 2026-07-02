import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || ''

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${STRAPI_URL}/graphql` }),
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        keyFields: ['documentId'],
      },
      Query: {
        fields: {
          books: {
            keyArgs: ['filters', 'sort'],
            merge(
              existing: unknown[] = [],
              incoming: unknown[],
              { args }: { args: Record<string, unknown> | null },
            ) {
              const pagination = args?.pagination as { start?: number } | undefined
              if ((pagination?.start ?? 0) === 0) return incoming
              return [...existing, ...incoming]
            },
          },
        },
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
