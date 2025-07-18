const Post = require('../models/Post');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

exports.createPost = async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        const post = await Post.create({
            title,
            content,
            author: req.user.id,
            categories,
            tags
        });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const { category, tag } = req.query;
        let filter = {};
        if (category) {
            const cat = await Category.findOne({ name: category });
            if (cat) filter.categories = cat._id;
        }
        if (tag) {
            const tg = await Tag.findOne({ name: tag });
            if (tg) filter.tags = tg._id;
        }
        const posts = await Post.find(filter).populate('author categories tags');
        res.json(posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author categories tags')
            .lean();
        if (!post) return res.status(404).json({ message: 'Post not found' });
        post.likeCount = post.likes?.length || 0;
        post.dislikeCount = post.dislikes?.length || 0;
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.user.id)) post.likes.push(req.user.id);
        post.dislikes = post.dislikes.filter(id => id.toString() !== req.user.id);
        await post.save();
        res.json({ likeCount: post.likes.length });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.dislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.dislikes.includes(req.user.id)) post.dislikes.push(req.user.id);
        post.likes = post.likes.filter(id => id.toString() !== req.user.id);
        await post.save();
        res.json({ dislikeCount: post.dislikes.length });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
