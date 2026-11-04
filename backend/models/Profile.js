const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  about: {
    type: String,
    default: "I'm Safal Neupane. A developer who enjoys turning random ideas into things that actually work.",
  },
  currentlyObsessed: {
    type: [String],
    default: ['React Native', 'AI', 'Full Stack Development', 'UI/UX', 'Building random projects'],
  },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  resumeUrl: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
