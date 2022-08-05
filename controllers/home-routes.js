const router = require('express').Router();
const { Op } = require('sequelize');
const { Hobby, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session)
    Hobby.findAll({
        where: {
          id: {
            [Op.between]: [1,6]
          }
        },
        attributes: [
            'id',
            'title',
            'your_hobby',
            'category',
            'image_url'
        ],
        order: [['created_at', 'DESC']], 
        include: [
            {
              model: User,
              attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
          const hobbies = dbPostData.map(hobby => hobby.get({ plain: true }));
          res.render('homepage', {
            hobbies,
            loggedIn: req.session.loggedIn
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// find all hobbies
router.get('/hobbies', (req, res) => {
  console.log(req.session)
  Hobby.findAll({
      attributes: [
          'id',
          'title',
          'category',
          'image_url'
      ],
      order: [['created_at', 'DESC']], 
      include: [
          {
            model: User,
            attributes: ['username']
          }
      ]
  })
      .then(dbPostData => {
        const hobbies = dbPostData.map(hobby => hobby.get({ plain: true }));
        res.render('category', {
          hobbies,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// get single post
router.get('/hobbies/:id', (req,res) => {
  Hobby.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'category',
        'image_url',
        'created_at',
        'your_hobby'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'hobby_id', 'created_at'],
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const hobby = dbPostData.get({ plain: true });
      res.render('single-hobby', {
        hobby,
        loggedIn: req.session.loggedIn
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

router.get('/hobbies/category/:category', (req, res) => {
  console.log(req.params.category)
  Hobby.findAll({
      where: {
        category: req.params.category
      },
      attributes: [
          'id',
          'title',
          'category',
          'image_url'
      ],
      order: [['created_at', 'DESC']], 
      include: [
          {
            model: User,
            attributes: ['username']
          }
      ]
  })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this category' });
          return;
        }
        const hobbies = dbPostData.map(hobby => hobby.get({ plain: true }));
        res.render('category', {
          hobbies,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//login / signup page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login-page', { layout: 'login'});
});

module.exports = router;