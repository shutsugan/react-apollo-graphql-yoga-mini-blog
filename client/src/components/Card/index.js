import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_POST_MUTATION } from '../../queries/post';
import { VOTE_MUTATION } from '../../queries/vote';
import { getUserId } from '../../utils';

import Modal from '../../components/Modal';
import Error from '../../components/Error';

import heartOutline from '../../icons/heartOutline.svg';
import heartFilled from '../../icons/heartFilled.svg';

import './index.css';

const Card = ({ post, client }) => {
    const [error, setError] = useState('');
    const [modal, setModal] = useState('');
    const [like, setLike] = useState(false);

    useEffect(_ => {
      const _isLiked = _ => {
        let liked = false;
        post.votes.forEach(vote => {
          if (vote.author.id === getUserId().userId) return liked = true;
        });

        setLike(liked);
      };

      _isLiked();
    }, [post]);

    //TODO: implement Optimistic UI

    const _like = mutation => {
      mutation();

      setLike(true);
    }

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

    const _voted = data => console.log('=>', data);

    const _displayError = error => setError('Something went wrong');

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
            <h2 className="card__title pd-6-16 pdt-16 mr-none">
                {post.title}
            </h2>
            <div
                className="card__article pd-6-16 pdb-16"
                dangerouslySetInnerHTML={{__html: _articlePreview(post.article)}}>
            </div>
            <div className="card__footer flex space-between pd-16">
                <button
                  className="button card__read-more pd-16"
                  onClick={_ => setModal(post)}>
                  Read More
                </button>

                <Mutation
                  mutation={VOTE_MUTATION}
                  variables={{ post: post.id, author: getUserId().userId }}
                  onCompleted={_voted}
                  onError={({ graphQLErrors }) => _displayError(graphQLErrors)}>
                  {
                    mutation => (
                      getUserId() && !like &&
                      <img
                        className="icon icon__like"
                        onClick={_ => _like(mutation)}
                        src={heartOutline} alt="unliked post"
                      />
                    )
                  }
                </Mutation>

                {
                  getUserId() && like &&
                  <img
                    className="icon icon__like"
                    src={heartFilled} alt="liked post"
                  />
                }
            </div>

            {modal && <Modal post={modal} setter={setModal} />}
            {error && <Error message={error} />}
        </div>
    );
};

export default Card;
