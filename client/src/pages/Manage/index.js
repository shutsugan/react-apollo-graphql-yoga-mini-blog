import React, { useState } from 'react';

import Card from '../../components/Card';
import Paginate from '../../components/Paginate';
import Error from '../../components/Error';
import ShimmerLoader from '../../components/ShimmerLoader';

import { Query } from 'react-apollo';
import { POSTS_QUERY } from '../../queries/post';
import { getUserId } from '../../utils';

const Manage = _ => {
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <Query
      query={POSTS_QUERY}
      variables={{ skip, limit: 10, published: false }}>
        {
            ({ loading, error, data, subscribeToMore }) => {
                if (loading) return <ShimmerLoader />;
                if (error) return <Error error={error} />;
                if (count === 0) setCount(data.feed.count);
                if (!getUserId()) return;

                const list = data.feed.posts.map(post => (
                    getUserId().userId === post.author.id &&
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

export default Manage;
