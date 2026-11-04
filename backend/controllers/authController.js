const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const match = await admin.comparePassword(password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = generateToken(admin._id);
    res.json({ success: true, token, username: admin.username });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res) => {
  res.json({ success: true, id: req.admin.id });
};
