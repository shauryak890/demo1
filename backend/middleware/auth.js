const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Debug - Auth header:', authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Get token from Bearer string
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Debug - Decoded token:', decoded);

    // Ensure all required fields are present
    if (!decoded.id || !decoded.role) {
      console.error('Debug - Missing token fields:', decoded);
      return res.status(401).json({ message: 'Invalid token structure' });
    }

    // Add user from payload
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      agentId: decoded.agentId
    };

    console.log('Debug - Set user:', req.user);
    next();
  } catch (err) {
    console.error('Debug - Auth error:', {
      message: err.message,
      stack: err.stack
    });
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 