const router = require('express').Router();
const { Hobby, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all hobbies
router.get('/', (req, res) => {
    Hobby.findAll({
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all hobbies by category
router.get('/:category', (req, res) => {
  Hobby.findAll({
      where: {
        category: req.params.category
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
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get one hobby
router.get('/:id', (req, res) => {
    Hobby.findOne({
      where: {
        id: req.params.id
      },
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
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.post('/', withAuth, (req, res) => {
    Hobby.create({
      title: req.body.title,
      your_hobby: req.body.your_hobby,
      category: req.body.category,
      image_url: req.body.image_url,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// update by user_id
router.put('/:id', withAuth, (req, res) => {
    Hobby.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No hobby found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// delete by user_id
router.delete('/:id', withAuth, (req, res) => {
    Hobby.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
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