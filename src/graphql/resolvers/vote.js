const vote = async (_, { post, author }, { context }) => {
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

export { vote };
