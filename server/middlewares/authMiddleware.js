import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import { config } from 'dotenv';
config();

/**
 * Authentication middleware function.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to call.
 * @return {void}
 */
async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  // logger.info('Token:', token);

  if (!token) {
    logger.warn('No token provided');
    return next(new ApiError(401, 'Login again to access'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...decoded };
    next(); // User is authenticated, allow access
  } catch (error) {
    logger.error('Token verification failed:', error);
    next(new ApiError(401, 'Unauthorized'));
  }
}

export default authMiddleware;
