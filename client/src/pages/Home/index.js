import React from 'react';

import { Query } from 'react-apollo';
import { POSTS_QUERY } from '../../queries/post';

const Home = _ => {
    return (
        <Query query={POSTS_QUERY}>
            {
                ({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error</div>;

                    const list = data.posts.map(post => <div key={post.id}>{post.title}</div>);

                    return <>{list}</>
                }
            }
        </Query>
    );
};

export default Home;