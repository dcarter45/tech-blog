const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(`made it here`);
    Post.findAll({
        where: {
            user_id: req.session._id
        },
        attributes: [
            'id',
            'title',
            'post',
          
            [sequelize.literal(`(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)`), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_contents', 'post_id', 'user_id', ],
                include: {
                    model: User,
                    attributes: ['user_username']
                }
            },
            {
                model: User,
                attributes: ['user_username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log('error with dashboard get all', err);
        res.status(500).json(err);
    });
});

module.exports = router;
