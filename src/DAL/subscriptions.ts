import { gql } from '@apollo/client';

export const NEW_USER = gql`
subscription {
  listen(topic: "new_user") {
    relatedNode {
      ... on User {
        id
        name
      }
    }
  }
}
`;