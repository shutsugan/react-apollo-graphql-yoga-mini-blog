const createVote = async (_, { post, author }, { context }) => {
  const vote = await context.models.Vote.findOne({ post, author });
  if (vote) throw new Error(`Already voted for post ${vote}`);

  try {
    const newVote = await context.models.Vote({
      post,
      author
    });

    await context.models
      .Post
      .updateOne({ _id: post }, { $push: { votes: newVote._id } });

    await newVote.save();
    return newVote;
  } catch (err) {
    throw new Error('Can not vote for this post');
  }
};

const deleteVote = async (_, { post, author }, { context }) => {
  const vote = await context.models.Vote.findOne({ post, author });
  if (!vote) throw new Error(`Not voted on this post`);

  try {
    await context.models.Vote.deleteOne({ post, author });

    await context.models
      .Post
      .updateOne({ _id: post }, { $pull: { votes: vote._id } });

    return vote;
  } catch (err) {
    throw new Error('Can not delete this vote');
  }
};

const votes = async (_, { post, author }, { context }) => {
  const theVote = await context.models
    .Vote
    .find({ post, author })
    .populate('post', 'author');

  return theVote;
};

export {
  createVote,
  deleteVote,
  votes
};
