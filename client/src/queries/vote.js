import gql from 'graphql-tag';

export const VOTE_MUTATION = gql`
  mutation VoteMutation($post: ID!, $author: ID!) {
    vote(post: $post, author: $author) {
      post {
        id
        title
        article
        art
        draft
        createdAt
      }
      author {
        id
        name
        email
      }
    }
  }
`;
