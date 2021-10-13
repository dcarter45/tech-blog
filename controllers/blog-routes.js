const router = require('express').Router();


const posts= [{
    id:1,
    author: 'Darrell',
    content:'AAA'
},
{
    id:2,
    author: 'David',
    content:'BBB'
}];



router.get('/', async (req, res) => {
    res.render('homepage', {posts});
  });

  module.exports = router;