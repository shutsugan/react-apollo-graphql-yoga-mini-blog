import gql from 'graphql-tag';

export const VOTE_QUERY = gql`
  query getVote($post: String!, $author: String!) {
    votes(post: $post, author: $author) {
      post {
        id
      }
      author {
        id
      }
    }
  }
`;

export const VOTE_MUTATION = gql`
  mutation VoteMutation($post: String!, $author: String!) {
    createVote(post: $post, author: $author) {
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
