const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { get, update } = require('../controllers/profileController');

router.get('/', get);
router.put('/', authMiddleware, update);

module.exports = router;
