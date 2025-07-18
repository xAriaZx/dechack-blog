exports.validateRegister = ({ username, email, password }) => {
    if (!username || username.length < 3) return 'Invalid username';
    if (!email || !email.includes('@')) return 'Invalid email';
    if (!password || password.length < 6) return 'Password too short';
    return null;
};

exports.validatePost = ({ title, content }) => {
    if (!title || title.length < 3) return 'Invalid title';
    if (!content || content.length < 10) return 'Content too short';
    return null;
};

exports.validateComment = ({ content }) => {
    if (!content || content.length < 1) return 'Comment required';
    return null;
};
