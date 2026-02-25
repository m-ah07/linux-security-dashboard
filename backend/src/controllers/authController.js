const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const ADMIN_PLAIN_PASSWORD = process.env.ADMIN_PASSWORD;

let cachedHash = null;

const getAdminHash = async () => {
  if (ADMIN_PASSWORD_HASH) return ADMIN_PASSWORD_HASH;
  if (ADMIN_PLAIN_PASSWORD) {
    if (!cachedHash) {
      cachedHash = await bcrypt.hash(ADMIN_PLAIN_PASSWORD, 10);
    }
    return cachedHash;
  }
  return await bcrypt.hash('admin', 10);
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    const hash = await getAdminHash();
    const valid = await bcrypt.compare(password, hash);
    if (username !== ADMIN_USERNAME || !valid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    return res.json({ token, username });
  } catch (err) {
    return res.status(500).json({ error: 'Login failed.' });
  }
};
