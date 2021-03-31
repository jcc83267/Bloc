const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const twitch = require('./twitch')
const emailReg = require('./email')

router.use('/twitch', twitch );
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/emailRegister', emailReg)

module.exports = router;