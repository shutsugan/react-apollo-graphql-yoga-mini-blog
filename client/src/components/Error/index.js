import React from 'react';

import './index.css';

const Error = ({ error }) => {
  const {message} = error;

  return (
      <div
          className="error fixed top-right pd-16"
          onClick={({target}) => target.remove()}>
          {message}
      </div>
  );
}

export default Error;
