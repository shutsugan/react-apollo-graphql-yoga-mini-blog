import React, { useState, useEffect } from 'react';
import { Mutation, withApollo } from 'react-apollo';

import FormHead from '../../components/FormHead';
import Field from '../../components/Field';
import FileField from '../../components/FileField';
import PageSwitcher from '../../components/PageSwitcher';
import Switch from '../../components/Switch';
import Editor from '../../components/Editor';
import Error from '../../components/Error';

import { POST_QUERY, POSTS_QUERY, UPDATE_POST_MUTATION } from '../../queries/post';
import { getUserId, goBack, displayError } from '../../utils';

const UpdatePost = ({ history, match, client }) => {
    const { id } = match.params;
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');
    const [art, setArt] = useState('');
    const [draft, setDraft] = useState('');
    const [error, setError] = useState('');

    useEffect(_ => {
        const _getPost = async _ => {
            const result = await client.query({
                query: POST_QUERY,
                variables: { id }
            });

            const { post } = await result.data;
            setTitle(post.title);
            setArticle(post.article);
            setDraft(post.draft);
            setArt(post.art);

            return post;
        };

        _getPost();
    }, [id, match, client]);

    if (!getUserId()) return goBack(history, '/');

    const _confirm = _ => goBack(history, '/');

    return (
        <div className="login full-height flex flex-column center">
            <div className="half pd-16">
                <FormHead
                    title="Update the Post"
                    subTitle="Enter the post details below"
                />

                <Field
                    name="title"
                    type="text"
                    required={true}
                    val={title}
                    setter={setTitle}
                    placeholder="Post title here"
                />

                <Editor
                    name="article"
                    required={true}
                    val={article}
                    setter={setArticle}
                />

                <FileField
                    name="art"
                    setter={setArt}
                />

                <Switch
                    name="publish"
                    val={draft}
                    setter={setDraft}
                    text="Publish the post? "
                />

                <Mutation
                    mutation={UPDATE_POST_MUTATION}
                    variables={{ id, title, article, art, draft }}
                    onCompleted={_confirm}
                    onError={({ graphQLErrors }) => displayError(graphQLErrors, setError)}
                    update={(store, { data: { updatePost } }) => {
                      const variables = { skip: 0, limit: 10, published: true };
                      const data = store.readQuery({
                        query: POSTS_QUERY,
                        variables
                      });

                      const posts = data.feed.posts;
                      const postIds = posts.map(post => post.id);
                      const position = postIds.indexOf(updatePost.id);

                      if (updatePost.draft) posts.splice(position, 1, updatePost);
                      else posts.splice(position, 1);

                      store.writeQuery({
                        query: POSTS_QUERY,
                        data,
                        variables
                      });
                    }}>
                    {
                        mutation => (
                            <button
                                className="button full pd-16"
                                onClick={mutation}>
                                Save post
                            </button>
                        )
                    }
                </Mutation>

                <PageSwitcher
                    to="/"
                    text="Go back to "
                    label="Home"
                />
            </div>

            {error && <Error message={error} />}
        </div>
    );
};

export default withApollo(UpdatePost);
