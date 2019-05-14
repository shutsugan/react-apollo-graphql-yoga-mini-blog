import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const voteSchema = Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: { createdAt: 'createdAt' } });

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
