const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  res.redirect('/');
});


router.get('/:title', (req, res) => {
  Post.findAll({
    where: {
      title: req.params.title
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'post_content',
      'star_rating',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      const postNum = posts.length;
      console.log(posts.length);
      res.render('reviews', { posts, loggedIn: req.session.loggedIn, postNum: postNum });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;