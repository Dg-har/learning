require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Project = require('../models/Project');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🍃 Connected to MongoDB');

  // Seed admin
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.error('❌ Set ADMIN_PASSWORD in .env before seeding');
    process.exit(1);
  }

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`⚠️  Admin "${username}" already exists. Skipping.`);
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    await Admin.create({ username, passwordHash });
    console.log(`✅ Admin created: ${username}`);
  }

  // Seed sample projects
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany([
      {
        title: 'NEPORA',
        description: 'AI-powered travel companion that plans your trips intelligently.',
        longDescription: 'Nepora is a full-stack AI travel companion app built with React Native and Node.js. It uses AI to generate personalized travel itineraries based on your preferences, budget, and travel style.',
        level: 1,
        stack: ['React Native', 'Node.js', 'MongoDB', 'AI/OpenAI'],
        status: 'completed',
        liveUrl: '',
        githubUrl: 'https://github.com/safal',
        featured: true,
        order: 1,
      },
      {
        title: 'DEVFOLIO',
        description: 'This very portfolio — built from scratch with personality.',
        longDescription: 'A chaotic, creative, interactive portfolio built with React, Vite, Framer Motion, and a full Node.js/MongoDB backend. Because normal portfolios are boring.',
        level: 2,
        stack: ['React', 'Node.js', 'MongoDB', 'Framer Motion'],
        status: 'completed',
        githubUrl: 'https://github.com/safal',
        featured: true,
        order: 2,
      },
      {
        title: '??? TOP SECRET',
        description: 'Something wild is cooking...',
        longDescription: 'Not ready to reveal this one yet. Stay tuned.',
        level: 3,
        stack: [],
        status: 'coming-soon',
        featured: false,
        order: 3,
      },
    ]);
    console.log('✅ Sample projects seeded');
  } else {
    console.log('⚠️  Projects already exist. Skipping seed.');
  }

  await mongoose.disconnect();
  console.log('🚀 Seed complete!');
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
