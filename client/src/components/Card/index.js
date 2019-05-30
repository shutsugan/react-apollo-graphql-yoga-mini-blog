import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_POST_MUTATION, POSTS_QUERY } from '../../queries/post';
import { VOTE_MUTATION, DELETE_VOTE_MUTATION } from '../../queries/vote';
import { getUserId, displayError } from '../../utils';

import Modal from '../../components/Modal';
import Error from '../../components/Error';

import heartOutline from '../../icons/heartOutline.svg';
import heartFilled from '../../icons/heartFilled.svg';

import './index.css';

const Card = ({ post }) => {
    const [error, setError] = useState('');
    const [modal, setModal] = useState('');
    const [like, setLike] = useState(false);

    useEffect(_ => {
      const _isLiked = _ => {
        let liked = false;

        post.votes.forEach(vote => {
          if (getUserId() && vote.author.id === getUserId().userId) {
            return liked = true;
          }
        });

        setLike(liked);
      };

      _isLiked();
    }, [post]);

    //TODO: implement Optimistic UI

    const _toggleLike = (like, mutation) => {
      mutation();

      setLike(like);
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

    return (
        <div className="card flex flex-column mrb-16">
            <div className="card__art full relative">
                <img
                    className="full"
                    src={`http://localhost:4000/images/${post.art}`}
                    alt={post.title}
                />
                {
                  getUserId() &&
                  <Mutation
                    mutation={DELETE_POST_MUTATION}
                    variables={{ id: post.id, archive: true }}
                    onCompleted={_deleted}
                    onError={({ graphQLErrors }) => displayError(graphQLErrors, setError)}
                    update={(store, { data: { deletePost } }) => {
                      const variables = { skip: 0, limit: 10, published: true };
                      const data = store.readQuery({
                        query: POSTS_QUERY,
                        variables
                      });

                      const posts = data.feed.posts;
                      data.feed.posts = posts.filter(post => post.id !== deletePost.id);

                      store.writeQuery({
                        query: POSTS_QUERY,
                        data,
                        variables
                      });
                    }}>
                    {
                        mutation => (
                            <span
                                className="delete-icon flex center absolute top-right"
                                onClick={event => _deleted(event, mutation)}>
                                <b className="x-icon">x</b>
                            </span>
                        )
                    }
                </Mutation>
              }
            </div>
            <h2 className="card__title pd-6-16 pdt-16 mr-none">{post.title}</h2>
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

                {
                  getUserId() &&
                  <Mutation
                    mutation={VOTE_MUTATION}
                    variables={{ post: post.id, author: getUserId().userId }}
                    onError={({ graphQLErrors }) => displayError(graphQLErrors, setError)}
                    update={(store, {data: { createVote } }) => {
                      const variables = { skip: 0, limit: 10, published: true };
                      const data = store.readQuery({
                        query: POSTS_QUERY,
                        variables
                      });

                      const { id } = createVote;
                      const posts = data.feed.posts;
                      data.feed.posts = posts.map(item => {
                        if (item.id === post.id) item.votes = [id];
                        return item;
                      });

                      store.writeQuery({
                        query: POSTS_QUERY,
                        data,
                        variables
                      });
                    }}>
                    {
                      mutation => (
                        !like &&
                        <img
                          className="icon icon__like"
                          onClick={_ => _toggleLike(true, mutation)}
                          src={heartOutline} alt="unliked post"
                        />
                      )
                    }
                  </Mutation>
                }

                {
                  getUserId() &&
                  <Mutation
                    mutation={DELETE_VOTE_MUTATION}
                    variables={{ post: post.id, author: getUserId().userId }}
                    onError={({ graphQLErrors }) => displayError(graphQLErrors, setError)}
                    update={(store, { data: { deleteVote } }) => {
                      const variables = { skip: 0, limit: 10, published: true };
                      const data = store.readQuery({
                        query: POSTS_QUERY,
                        variables
                      });

                      const posts = data.feed.posts;
                      data.feed.posts = posts.map(item => {
                        if (item.id === post.id) item.votes = [];
                        return item;
                      });

                      store.writeQuery({
                        query: POSTS_QUERY,
                        data,
                        variables
                      });
                    }}>
                    {
                      mutation => (
                        like &&
                        <img
                          className="icon icon__like"
                          onClick={_ => _toggleLike(false, mutation)}
                          src={heartFilled} alt="liked post"
                        />
                      )
                    }
                  </Mutation>
                }
            </div>

            {modal && <Modal post={modal} setter={setModal} />}
            {error && <Error message={error} />}
        </div>
    );
};

export default Card;
