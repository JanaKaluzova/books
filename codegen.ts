import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.VITE_STRAPI_URL
    ? `${process.env.VITE_STRAPI_URL}/graphql`
    : 'http://localhost:1337/graphql',
  documents: ['src/**/*.ts', 'src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './src/api/graphql/generated/': {
      preset: 'client',
      presetConfig: {
        useHooks: true,
        fragmentMasking: false,
      },
    },
  },
}

export default config
