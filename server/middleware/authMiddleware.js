const jwt = require('jsonwebtoken');

// JWT Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;



// const jwt = require('jsonwebtoken');

// // JWT Authentication middleware
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  
//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to request object
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// module.exports = authMiddleware;