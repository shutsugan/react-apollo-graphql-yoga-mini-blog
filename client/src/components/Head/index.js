import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { getUserId, removeToken } from '../../utils';

const Head = ({ history }) => (
  <div className="head flex space-between full pd-16">
    <div className="head__left flex center">
      <Link className="link mrr-16" to="/">Home</Link>
      {
        getUserId() && [
          <Link key="add" className="link mrr-16" to="/create">Add Post</Link>,
          <Link key="manage" className="link mrr-16" to="/manage">Manage Posts</Link>
        ]
      }
    </div>
    <div className="head__right">
      {
        getUserId() &&
        <div className="link" onClick={_ => removeToken(history, '/')}>
          Logout
        </div>
      }
      {
        !getUserId() && [
          <Link key="login" className="link mrr-16" to="/login">Login</Link>,
          <Link key="signup" className="link mrr-16" to="/signup">Signup</Link>
        ]
      }
    </div>
  </div>
);

export default withRouter(Head);
