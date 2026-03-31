import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${STRAPI_URL}/graphql` }),
  cache: new InMemoryCache(),
})
