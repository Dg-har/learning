const Contact = require('../models/Contact');

exports.create = async (req, res, next) => {
  try {
    const { name, email, project, message } = req.body;
    const contact = await Contact.create({ name, email, project, message });
    res.status(201).json({ success: true, message: 'Message received! 🚀', data: contact });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
