const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.updateProfile = async (req, res) => {
    try {
        const { profile } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { profile }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
