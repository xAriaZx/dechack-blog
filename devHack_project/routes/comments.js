const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const auth = require('../middleware/auth');
const router = express.Router();
router.post('/:postId', auth, addComment);
router.get('/:postId', getComments);
module.exports = router;