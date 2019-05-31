import React from 'react';

import './index.css';

const ShimmerLoader = _ => (
  <div className="shimmer__container pd-16">
    <div className="shimmer shadow flex flex-column">
      <div className="shimmer__art shimmer full"></div>
      <div className="shimmer__info pd-16">
        <div className="shimmer__title shimmer mr-none mrb-16"></div>
        <div className="shimmer__article shimmer mrb-8"></div>
        <div className="shimmer__article shimmer mrb-8"></div>
        <div className="shimmer__article shimmer mrb-8"></div>
      </div>
    </div>
  </div>
);

export default ShimmerLoader;
