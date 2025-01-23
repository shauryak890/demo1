const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data storage (replace with a database in production)
const users = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: '$2a$10$exampleHashedPassword', // Hashed password for "admin123"
    role: 'admin',
  },
];

const agents = [
  {
    agentId: 'A001',
    name: 'John Doe',
    leadsGenerated: 15,
    monthlyPayout: 7500,
    clients: [
      { name: 'Client 1', email: 'client1@example.com', phone: '1234567890' },
    ],
  },
];

// Login route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token, role: user.role });
});

// Signup route
app.post('/auth/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role: role || 'agent',
  };

  users.push(newUser);

  res.json({ message: 'User registered successfully.' });
});

// Route to fetch all agents (for admin panel)
app.get('/admin/agents', (req, res) => {
  res.json(agents);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));