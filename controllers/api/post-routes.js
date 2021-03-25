const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const { sequelize } = require('../../models/User');


module.exports = router;