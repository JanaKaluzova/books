import type { Core } from '@strapi/strapi'
import type { GraphQLFormattedError } from 'graphql'
import { GraphQLError } from 'graphql'

const config = (_: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      playgroundAlways: true,
      apolloServer: {
        formatError: (
          formattedError: GraphQLFormattedError,
          error: unknown,
        ): GraphQLFormattedError => {
          const original = error instanceof GraphQLError ? error.originalError : error
          if (original instanceof Error && original.name === 'ApplicationError') {
            return { message: original.message, extensions: { code: 'BAD_USER_INPUT' } }
          }
          return formattedError
        },
      },
    },
  },
})

export default config
