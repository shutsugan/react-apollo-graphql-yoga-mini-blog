const post = async ({ id }, _, { context }) => {
  const vote = await context.models
    .Vote
    .findById(id)
    .populate('post');

    if (!vote) throw new Error('No vote found');

    return vote.post;
};

const author = async ({ id }, _, { context }) => {
  const vote = await context.models
    .Vote
    .findById(id)
    .populate('author');

    if (!vote) throw new Error('No author found');

    return vote.author;
};

export default { post, author };
