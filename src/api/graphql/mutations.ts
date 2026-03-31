import { gql } from '@apollo/client'
import { BOOK_FIELDS } from './queries'

export const CREATE_BOOK = gql`
  ${BOOK_FIELDS}
  mutation CreateBook($data: BookInput!) {
    createBook(data: $data) {
      ...BookFields
    }
  }
`

export const UPDATE_BOOK = gql`
  ${BOOK_FIELDS}
  mutation UpdateBook($documentId: ID!, $data: BookInput!) {
    updateBook(documentId: $documentId, data: $data) {
      ...BookFields
    }
  }
`

export const DELETE_BOOK = gql`
  mutation DeleteBook($documentId: ID!) {
    deleteBook(documentId: $documentId) {
      documentId
    }
  }
`
