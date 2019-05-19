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
      id
      post {
        id
      }
    }
  }
`;

export const DELETE_VOTE_MUTATION = gql`
  mutation DeleteVoteMutation($post: String!, $author: String!) {
    deleteVote(post: $post, author: $author) {
      id
    }
  }
`;
