const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const hobbyRoutes = require('./hobby-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/hobbies', hobbyRoutes);
router.use('/comments', commentRoutes)

module.exports = router;