const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  longDescription: {
    type: String,
    default: '',
  },
  level: {
    type: Number,
    default: 1,
  },
  stack: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'coming-soon', 'locked'],
    default: 'completed',
  },
  liveUrl: {
    type: String,
    default: '',
  },
  githubUrl: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
