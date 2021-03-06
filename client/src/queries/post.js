import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
    query getPosts($skip: Int, $limit: Int, $published: Boolean) {
        feed(skip: $skip, limit: $limit, published: $published) {
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
                votes {
                  author {
                    id
                  }
                }
            }
            count
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
            author {
                id
                name
                email
            }
            votes {
              author {
                id
              }
            }
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
            author {
                id
                name
                email
            }
            votes {
              author {
                id
              }
            }
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
