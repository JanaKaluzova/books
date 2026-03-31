/* eslint-disable */

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  \n  mutation CreateBook($data: BookInput!) {\n    createBook(data: $data) {\n      ...BookFields\n    }\n  }\n': typeof types.CreateBookDocument
  '\n  \n  mutation UpdateBook($documentId: ID!, $data: BookInput!) {\n    updateBook(documentId: $documentId, data: $data) {\n      ...BookFields\n    }\n  }\n': typeof types.UpdateBookDocument
  '\n  mutation DeleteBook($documentId: ID!) {\n    deleteBook(documentId: $documentId) {\n      documentId\n    }\n  }\n': typeof types.DeleteBookDocument
  '\n  fragment BookFields on Book {\n    documentId\n    title\n    author\n    coverUrl\n    rating\n    genre\n    year\n    pages\n    dateRead\n    description\n  }\n': typeof types.BookFieldsFragmentDoc
  '\n  \n  query GetBooks {\n    books(filters: { isWishlist: { eq: false } }, sort: "createdAt:desc") {\n      ...BookFields\n    }\n  }\n': typeof types.GetBooksDocument
  '\n  \n  query GetWishlist {\n    books(filters: { isWishlist: { eq: true } }, sort: "createdAt:desc") {\n      ...BookFields\n    }\n  }\n': typeof types.GetWishlistDocument
}
const documents: Documents = {
  '\n  \n  mutation CreateBook($data: BookInput!) {\n    createBook(data: $data) {\n      ...BookFields\n    }\n  }\n':
    types.CreateBookDocument,
  '\n  \n  mutation UpdateBook($documentId: ID!, $data: BookInput!) {\n    updateBook(documentId: $documentId, data: $data) {\n      ...BookFields\n    }\n  }\n':
    types.UpdateBookDocument,
  '\n  mutation DeleteBook($documentId: ID!) {\n    deleteBook(documentId: $documentId) {\n      documentId\n    }\n  }\n':
    types.DeleteBookDocument,
  '\n  fragment BookFields on Book {\n    documentId\n    title\n    author\n    coverUrl\n    rating\n    genre\n    year\n    pages\n    dateRead\n    description\n  }\n':
    types.BookFieldsFragmentDoc,
  '\n  \n  query GetBooks {\n    books(filters: { isWishlist: { eq: false } }, sort: "createdAt:desc") {\n      ...BookFields\n    }\n  }\n':
    types.GetBooksDocument,
  '\n  \n  query GetWishlist {\n    books(filters: { isWishlist: { eq: true } }, sort: "createdAt:desc") {\n      ...BookFields\n    }\n  }\n':
    types.GetWishlistDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  \n  mutation CreateBook($data: BookInput!) {\n    createBook(data: $data) {\n      ...BookFields\n    }\n  }\n',
): (typeof documents)['\n  \n  mutation CreateBook($data: BookInput!) {\n    createBook(data: $data) {\n      ...BookFields\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  \n  mutation UpdateBook($documentId: ID!, $data: BookInput!) {\n    updateBook(documentId: $documentId, data: $data) {\n      ...BookFields\n    }\n  }\n',
): (typeof documents)['\n  \n  mutation UpdateBook($documentId: ID!, $data: BookInput!) {\n    updateBook(documentId: $documentId, data: $data) {\n      ...BookFields\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteBook($documentId: ID!) {\n    deleteBook(documentId: $documentId) {\n      documentId\n    }\n  }\n',
): (typeof documents)['\n  mutation DeleteBook($documentId: ID!) {\n    deleteBook(documentId: $documentId) {\n      documentId\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment BookFields on Book {\n    documentId\n    title\n    author\n    coverUrl\n    rating\n    genre\n    year\n    pages\n    dateRead\n    description\n  }\n',
): (typeof documents)['\n  fragment BookFields on Book {\n    documentId\n    title\n    author\n    coverUrl\n    rating\n    genre\n    year\n    pages\n    dateRead\n    description\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  \n  query GetBooks {\n    books(filters: { isWishlist: { eq: false } }, sort: "createdAt:desc") {\n      ...BookFields\n    }\n  }\n',
): (typeof documents)['\n  \n  query GetBooks {\n    books(filters: { isWishlist: { eq: false } }, sort: "createdAt:desc") {\n      ...BookFields\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  \n  query GetWishlist {\n    books(filters: { isWishlist: { eq: true } }, sort: "createdAt:desc") {\n      ...BookFields\n    }\n  }\n',
): (typeof documents)['\n  \n  query GetWishlist {\n    books(filters: { isWishlist: { eq: true } }, sort: "createdAt:desc") {\n      ...BookFields\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
