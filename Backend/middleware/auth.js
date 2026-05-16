const jwt = require('jsonwebtoken');

// This middleware runs before any protected route
// It checks if the request has a valid JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Token comes as "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info to request
        next();             // move to the actual route
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = verifyToken;
