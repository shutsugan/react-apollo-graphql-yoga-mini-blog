import React from 'react';

import './index.css';

const Error = ({message}) => (
    <div 
        className="error absolute top-right pd-16"
        onClick={({target}) => target.remove()}>
        {message}
    </div>
);

export default Error;