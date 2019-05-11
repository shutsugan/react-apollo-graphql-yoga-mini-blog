import processUpload from '../upload';

const limit = 10;
const postsOptions = { archive: false, draft: true };

const feed = async (_, { skip = 0 }, { context }) => {
  const posts = await context.models
    .Post
    .find(postsOptions, null, { skip, limit })
    .populate('author')
    .sort({ createdAt: 1 });

  const count = await context.models
    .Post
    .countDocuments(postsOptions);
  console.log(count);

  if (!posts) throw new Error('Posts do not exist');

  return {
    posts,
    count
  };
};

const post = async (_, { id }, { context }) => {
  const post = await context.models
    .Post
    .findById(id)
    .populate('author');

  if (!post) throw new Error('Post does not exist');

  return post;
};

const createPost = async (_, { title, author, art, ...data }, { context }) => {
  const post = await context.models.Post.findOne({ title });
  if (post) throw new Error('Please provide a unique title');

  try {
    const filename = await processUpload(art);
    const newPost = new context.models.Post({
      title,
      author,
      art: filename,
      ...data
    });

    await context.models
      .User
      .updateOne({ _id: author }, { $push: { posts: newPost._id } });

    await newPost.save();
    return newPost;
  } catch (err) {
    throw new Error('Can not Save The Post');
  }
};

const updatePost = async (_, { id, art, ...data }, { context }) => {
  try {
    const filename = await processUpload(art);
    const new_data = {...data, art: filename}

    const post = await context.models.Post.findByIdAndUpdate(id, { $set: new_data });
    const updatedPost = await context.models.Post.findById(id);

    return updatedPost;
  } catch (err) {
    console.log(err);
    throw new Error('Can not Update The Post');
  }
};

const deletePost = async (_, { id, archive }, { context }) => {
  const args = {id, archive};
  return updatePost(_, args, { context });
}

export {
  feed,
  post,
  createPost,
  updatePost,
  deletePost
};
