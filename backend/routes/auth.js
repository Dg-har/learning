const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { login, me } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post(
  '/login',
  validate([
    body('username').trim().notEmpty().withMessage('Username required'),
    body('password').notEmpty().withMessage('Password required'),
  ]),
  login
);

router.get('/me', authMiddleware, me);

module.exports = router;
