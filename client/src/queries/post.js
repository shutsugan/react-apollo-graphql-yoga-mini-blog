import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
    query {
        posts {
            id
            title
            article
            art
            draft
            createdAt
            author {
                id
                name
                email
            }
        }
    }
`;