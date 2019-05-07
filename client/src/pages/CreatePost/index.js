import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import FormHead from '../../components/FormHead';
import Field from '../../components/Field';
import PageSwitcher from '../../components/PageSwitcher';
import Switch from '../../components/Switch';
import Editor from '../../components/Editor';
import Error from '../../components/Error';

import { CREATE_POST_MUTATION } from '../../queries/post';
import { getUserId, goBack } from '../../utils';

const CreatePost = ({ history }) => {
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');
    const [art, setArt] = useState('');
    const [draft, setDraft] = useState(false);
    const [error, setError] = useState('');

    if (!getUserId()) return goBack(history, '/');

    const { userId } = getUserId();

    const _confirm = _ => goBack(history, '/');
    const _displayError = error => setError(error[0].message);

    return (
        <div className="login full-height flex flex-column center">
            <div className="half pd-16">
                <FormHead
                    title="Create a Post"
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
                    setter={setArticle}
                />

                <Field
                    name="art"
                    type="file"
                    val={art}
                    setter={setArt}
                />

                <Switch
                    name="publish"
                    val={draft}
                    setter={setDraft}
                    text="Publish the post? "
                />

                <Mutation
                    mutation={CREATE_POST_MUTATION}
                    variables={{ title, article, art, draft, author: userId }}
                    onCompleted={_confirm}
                    onError={({ graphQLErrors }) => _displayError(graphQLErrors)}>
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
                    label="Home"
                    text="Go back to "
                />
            </div>

            {error && <Error message={error} />}
        </div>
    )
};

export default CreatePost;