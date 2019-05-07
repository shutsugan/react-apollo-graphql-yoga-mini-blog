import React from 'react';

import Card from '../../components/Card';

import { Query } from 'react-apollo';
import { POSTS_QUERY } from '../../queries/post';

const Home = _ => {
    return (
        <Query query={POSTS_QUERY}>
            {
                ({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error</div>;

                    const list = data.posts.map(post => (
                        <Card key={post.id} post={post} />
                    ));

                    return <div className="grid pd-16">{list}</div>;
                }
            }
        </Query>
    );
};

export default Home;