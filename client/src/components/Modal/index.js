import React from 'react';
import { Link } from 'react-router-dom';

import { getUserId } from '../../utils';

import './index.css';

const Modal = ({ post, setter }) => (
  <div className="modal full full-height fixed flex flex-column">
    <div className="full relative">
      <img
        className="modal__img full mrb-16"
        src={`http://localhost:4000/images/${post.art}`}
        alt={post.title}
      />
      <span
        className="delete-icon flex center absolute top-right"
        onClick={event => setter('')}>
        <b className="x-icon">x</b>
      </span>
    </div>
    <div className="modal__post flex flex-column pd-16">
      <div>
        {
          getUserId().userId && post.author.id &&
          <Link className="link" to={`/update/${post.id}`}>Edit post</Link>
        }
        <h2 className="modal__title mr-none mrb-16">{post.title}</h2>
      </div>
      <div
          className="modal__article"
          dangerouslySetInnerHTML={{__html: post.article}}>
      </div>
    </div>
  </div>
);

export default Modal;
