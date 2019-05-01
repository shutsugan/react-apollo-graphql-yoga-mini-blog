const posts = async (_, __, { context }) => {
  const posts = await context.models
    .Post
    .find()
    .populate('author')
    .sort({ title: 1 });

  if (!posts) throw new Error('Posts do not exist');

  return posts;
};

const post = async (_, { id }, { context }) => {
  const post = await context.models
    .Post
    .findById(id)
    .populate('author');

  if (!post) throw new Error('Post does not exist');

  return post;
};

const createPost = async (_, { title, author, ...data }, { context }) => {
  const post = await context.models.Post.findOne({ title });
  if (post) throw new Error('Please provide a unique title');

  try {
    const newPost = new context.models.Post({ title, author, ...data });

    await context.models
      .User
      .updateOne({ _id: author }, { $push: { posts: newPost._id } });

    await newPost.save();
    return newPost;
  } catch (err) {
    throw new Error('Can not Save The Post');
  }
};

const updatePost = async (_, { id, ...data }, { context }) => {
  try {
    const post = await context.models.Post.findByIdAndUpdate(id, { $set: data });
    const updatedPost = await context.models.Post.findById(id);

    return updatedPost;
  } catch (err) {
    throw new Error('Can not Update The Post');
  }
};

const deletePost = async (_, { id, archive }, { context }) => {
  const args = {id, archive};
  return updatePost(_, args, { context });
}

export {
  posts,
  post,
  createPost,
  updatePost,
  deletePost
};
