const router = require('express').Router();
const sequelize = require('../config/connection');
const { Hobby, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// gets all hobbies posted by user that is currently logged in
router.get('/', withAuth, (req, res) => {
    console.log(req.session.user_id)
    Hobby.findAll({
      where: {
        user_id: req.session.user_id
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
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'hobby_id'],
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
    const hobbies = dbPostData.map(hobby => hobby.get({ plain: true }));
    res.render('dashboard', { hobbies, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

// add new hobby
router.get('/new', withAuth, (req,res) => {
  res.render('add-post', {loggedIn: true});
})

// when clicking on edit post, will be redirected to this page
router.get('/edit/:id', withAuth, (req, res) => {
    Hobby.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'your_hobby',
            'category',
            'image_url'
        ],
        include: [
        {
            model: User,
            attributes: ['username']
        }
        ]}
    )
        .then(dbPostData => {
        const hobby = dbPostData.get({ plain: true });

        res.render('edit-hobby', {
        hobby,
        loggedIn: true
        });

        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
})

module.exports = router;