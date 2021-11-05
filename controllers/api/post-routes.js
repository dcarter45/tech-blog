const router = require('express').Router();
// const withAuth = require('../../utils/auth');
const { Post, User, Comment } = require('../../models');


// GET /api/posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
            'id',
            'title'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_contents',
                    'post_id',
                    'user_id'
                    
                ],
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
})

// GET /api/posts/1
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title'],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_contents',
                    'post_id',
                    'user_id',
            
                ],
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
            if (!dbPostData) {
                res.status(404).json({ message: '3No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


// POST /api/posts
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        user_id: req.body.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// PUT /api/posts/1
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
        
    )
    .then(dbPostData => {
        if (!dbPostData[0]) {
          res.status(404).json({ message: '2No post found with this id' });
          return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// DELETE /api/posts/1
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: '1No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;