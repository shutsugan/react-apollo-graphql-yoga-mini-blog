const posts = async ({ id }, _, { context }) => {
  const user = await context.models
    .User
    .find({ id })
    .populate('posts');

  if (!user) throw new Error('No posts found');

  return user.posts;
};

export default { posts };
