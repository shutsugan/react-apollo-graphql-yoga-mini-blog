import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_POST_MUTATION } from '../../queries/post';
import { getUserId } from '../../utils';

import Modal from '../../components/Modal';
import Error from '../../components/Error';

import './index.css';

const Card = ({ post }) => {
    const [error, setError] = useState('');
    const [modal, setModal] = useState('');

    const _articlePreview = article => {
        return article && `${article.substring(0, 200)}`;
    };

    const  _deleted = (event, mutation) => {
        if (!event.target || !event.target.closest('.x-icon')) return;

        event.target
            .parentNode
            .parentNode
            .parentNode
            .remove();

        mutation();
    };

    const _displayError = error => setError(error[0].message);

    return (
        <div className="card flex flex-column mrb-16">
            <div className="card__art full relative">
                <img
                    className="full"
                    src={`http://localhost:4000/images/${post.art}`}
                    alt={post.title}
                />
                <Mutation
                    mutation={DELETE_POST_MUTATION}
                    variables={{ id: post.id, archive: true }}
                    onCompleted={_deleted}
                    onError={({ graphQLErrors }) => _displayError(graphQLErrors)}>
                    {
                        mutation => (
                            getUserId() &&
                            <span
                                className="delete-icon flex center absolute top-right"
                                onClick={event => _deleted(event, mutation)}>
                                <b className="x-icon">x</b>
                            </span>
                        )
                    }
                </Mutation>

            </div>
            <h2 className="card__title pd-6 mr-none">
                {post.title}
            </h2>
            <div
                className="card__article pd-6"
                dangerouslySetInnerHTML={{__html: _articlePreview(post.article)}}>
            </div>
            <div className="card__footer pd-16-6">
                <button
                  className="button card__read-more pd-16"
                  onClick={_ => setModal(post)}>
                  Read More
                </button>
            </div>

            {modal && <Modal post={modal} setter={setModal} />}
            {error && <Error message={error} />}
        </div>
    );
};

export default Card;
