const { Comment } = require('../models');

const commentData = [{
        comment_content: "Lorem ipsum dolor sit amet",
        user_id: 1,
        post_id: 1
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;