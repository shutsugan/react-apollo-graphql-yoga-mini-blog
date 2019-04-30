const posts = async (_, __, { context }) => {
  const posts = await context.models
    .Post
    .find()
    .populate('author')
    .sort({ title: 1 });

  if (!posts) throw new Error('Posts do not exist');

  return posts;
};

const post = async (_, { id }, { context}) => {
  const post = await context.models
    .Post
    .findById(id)
    .populate('author');

  if (!post) throw new Error('Post does not exist');

  return post;
};

const createPost = async (_, { title, article, art, author }, { context }) => {
  const post = await context.models.Post.findOne({ title });
  if (post) throw new Error('Please provide a unique title');

  const newPost = new context.models.Post({
    title,
    article,
    art,
    author
  });

  const user = await context.models.User.updateOne(
    { _id: author },
    { $push: { posts: newPost._id }}
  );

  try {
    await newPost.save();
  } catch (err) {
    throw new Error('Can not Save The Post!!');
  }

  return newPost;
};

export {
  posts,
  post,
  createPost
};
