const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/dashboard', (req, res) => {
    console.log(`AAA`);
    Post.findAll({
        where: {
            user_id: req.session.id
        },
        attributes: [
            'id',
            'post',
            'title',
            'user_id'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_contents', 'post_id', 'user_id'],
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
        console.log(`AAA`);
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log('error with dashboard get all', err);
        res.status(500).json(err);
    });
});

module.exports = router;