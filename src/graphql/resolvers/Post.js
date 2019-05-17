const author = async ({ id }, _, { context }) => {
  const post = await context.models
    .Post
    .findById(id)
    .populate('author');

  if (!post) throw new Error('No author found');

  return post.author;
}

const votes = async ({ id }, _, { context }) => {
  const post = await context.models
    .Post.findById(id)
    .populate('votes');

    if (!post) throw new Error('No votes found');

    return post.votes;
};

export default { author, votes };
