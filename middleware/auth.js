const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }
  // Set token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
// const jwt = require('jsonwebtoken');

// module.exports = async (req, res, next) => {
  
//   // Get token from header
//   token = req.headers.authorization.split(' ')[1];
  
//   // Check if not token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }
  
//   // Verify token
//   try {
//     await jwt.verify(token, `${process.env.JWT_SECRET}`, (error, decoded) => {
//       if (error) {
//         res.status(401).json({ msg: 'Token is not valid' });
//       } else {
//         req.user = decoded.user;
//         next();
//       }
//     });
//   } catch (err) {
//     console.error('Something wrong with auth middleware');
//     res.status(500).json({ msg: 'Server Error' });
//   }
// };
