require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { auth } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const systemRoutes = require('./routes/system');
const vulnerabilitiesRoutes = require('./routes/vulnerabilities');
const logsRoutes = require('./routes/logs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/system', auth, systemRoutes);
app.use('/api/vulnerabilities', auth, vulnerabilitiesRoutes);
app.use('/api/logs', auth, logsRoutes);

// For example 
// MongoDB:
// const mongoose = require('mongoose');
// mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/linux_security', { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
