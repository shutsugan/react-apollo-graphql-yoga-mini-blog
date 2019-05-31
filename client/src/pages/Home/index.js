import React, { useState } from 'react';

import Card from '../../components/Card';
import Paginate from '../../components/Paginate';
import Error from '../../components/Error';
import ShimmerLoader from '../../components/ShimmerLoader';

import { Query } from 'react-apollo';
import { POSTS_QUERY } from '../../queries/post';

const Home = _ => {
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);

  return (
      <Query
        query={POSTS_QUERY}
        variables={{ skip, limit: 10, published: true }}>
          {
              ({ loading, error, data, subscribeToMore }) => {
                  if (loading) return <ShimmerLoader />;
                  if (error) return <Error message={error} />;
                  if (count === 0) setCount(data.feed.count);

                  const list = data.feed.posts.map(post => (
                      <Card key={post.id} post={post} />
                  ));

                  return (
                    <>
                      <div className="grid pd-16">{list}</div>
                      {
                        list.length < count &&
                        <Paginate
                          skip={skip}
                          limit={count}
                          setter={setSkip}
                        />
                      }
                    </>
                  );
              }
          }
      </Query>
  );
}

export default Home;
