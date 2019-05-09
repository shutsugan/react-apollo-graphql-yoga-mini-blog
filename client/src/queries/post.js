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

export const POST_QUERY = gql`
    query getPost($id: String!) {
        post(id: $id) {
            id
            title
            article
            art
            draft
            createdAt
        }
    }
`;

export const CREATE_POST_MUTATION = gql`
    mutation CreatePostMutation($title: String!, $article: String!, $art: Upload, $draft: Boolean, $author: String!) {
        createPost(title: $title, article: $article, art: $art, draft: $draft, author: $author) {
            id
            title
            article
            art
            draft
            createdAt
        }
    }
`;

export const UPDATE_POST_MUTATION = gql`
    mutation UpdatePostMutation($id: String!, $title: String!, $article: String!, $art: Upload, $draft: Boolean) {
        updatePost(id: $id, title: $title, article: $article, art: $art, draft: $draft) {
            id
            title
            article
            art
            draft
            createdAt
        }
    }
`;

export const DELETE_POST_MUTATION = gql`
    mutation DeletePost_Mutation($id: String!, $archive: Boolean) {
        deletePost(id: $id, archive: $archive) {
            id
        }
    }
`;
