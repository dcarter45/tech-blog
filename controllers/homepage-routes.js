const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/homepage', async (req, res) => {
    res.render('homepage', {posts});
  });

const posts= [{
    id:1,
    author: 'Darrell',
    content:'Be kind to one another'
},
{
    id:2,
    author: 'David',
    content:'Love is a Drug, its like the strongest stuff ever'
}];

  module.exports = router;