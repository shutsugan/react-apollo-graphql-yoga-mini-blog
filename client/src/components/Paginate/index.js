import React from 'react';

import rightArrow from '../../icons/rightArrow.svg';
import leftArrow from '../../icons/leftArrow.svg';

const Paginate = ({ skip, count, setter }) => {
  const skipBy = 10;
  const loadMore = _ => setter(skip + skipBy);
  const loadLess = _ => setter(skip - skipBy);

  return (
    <div className="flex center">
      {
        (skip !== 0) &&
        <img
          className="icon mrr-16"
          onClick={loadLess}
          src={leftArrow} alt="left arrow icon"
        />
      }
      {
        ((count - 1) > skip) &&
          <img
            className="icon"
            onClick={loadMore}
            src={rightArrow} alt="right arrow icon"
          />
      }
    </div>
  );
}

export default Paginate;
