const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAll,
  getOne,
  create,
  update,
  deleteProject,
} = require('../controllers/projectController');

// Public
router.get('/', getAll);
router.get('/:id', getOne);

// Protected
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
