const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
}, { timestamps: true });
module.exports = mongoose.model('Comment', commentSchema);