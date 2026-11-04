const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const authMiddleware = require('../middleware/auth');
const {
  create,
  getAll,
  markRead,
  deleteContact,
} = require('../controllers/contactController');

// Public: submit contact form
router.post(
  '/',
  validate([
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    body('project').optional().trim().isLength({ max: 200 }),
  ]),
  create
);

// Protected: admin only
router.get('/', authMiddleware, getAll);
router.patch('/:id/read', authMiddleware, markRead);
router.delete('/:id', authMiddleware, deleteContact);

module.exports = router;
