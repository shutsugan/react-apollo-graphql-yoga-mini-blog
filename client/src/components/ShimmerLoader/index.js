import React from 'react';

import './index.css';

const ShimmerLoader = _ => (
  <div className="shimmer__container pd-16">
    <div className="shimmer shadow flex flex-column">
      <div className="shimmer__art shimmer full mrb-16"></div>
      <h2 className="shimmer__title shimmer mr-none mrb-16"></h2>
      <div className="shimmer__article shimmer"></div>
      <div className="shimmer__article shimmer"></div>
      <div className="shimmer__article shimmer"></div>
    </div>
  </div>
);

export default ShimmerLoader;
