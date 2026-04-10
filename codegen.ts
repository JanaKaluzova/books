import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.VITE_STRAPI_URL
    ? `${process.env.VITE_STRAPI_URL}/graphql`
    : 'http://localhost:1337/graphql',
  documents: 'src/**/*.graphql',
  ignoreNoDocuments: true,
  generates: {
    'src/api/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        enumAsConst: true,
        defaultScalarType: 'unknown',
        scalars: {
          DateTime: 'string',
          Date: 'string',
        },
        useTypeImports: true,
        documentMode: 'documentNode',
        dedupeFragments: true,
        preResolveTypes: true,
      },
    },
    'src/generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
