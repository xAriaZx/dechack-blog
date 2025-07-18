const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

exports.addComment = async (req, res) => {
    try {
        const { content, parent } = req.body;
        const comment = new Comment({
            post: req.params.postId,
            author: req.user.id,
            content,
            parent: parent || null
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('author').lean();
        // Build nested structure
        const map = {};
        comments.forEach(c => { c.children = []; map[c._id] = c; });
        const roots = [];
        comments.forEach(c => {
            if (c.parent) map[c.parent]?.children.push(c);
            else roots.push(c);
        });
        res.json(roots);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
