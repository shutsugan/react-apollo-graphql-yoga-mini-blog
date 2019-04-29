import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const postSchema = Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  article: {
    type: String,
    required: [true, 'Article is required']
  },
  draft: {
    type: Boolean,
    default: true
  },
  art: {
    type: String,
    default: 'default.png'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: { createdAt: 'createdAt' } });



const Post = mongoose.model('Post', postSchema);
export default Post;