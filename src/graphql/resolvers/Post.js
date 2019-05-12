const author = async ({ id }, _, { context }) => {
  const post = await context.models
    .Post
    .findById(id)
    .populate('author');

  if (!author) throw new Error('No author found');

  return post.author;
}

export default { author };
