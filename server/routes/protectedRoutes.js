/**
 * This module defines the routes for the protected API endpoints.
 * @module routes/protectedRoutes
 * @imports express
 * @imports middlewares/authMiddleware
 * @imports middlewares/authorizeRoles
 * @imports routes/studentRoutes
 * @imports routes/teacherRoutes
 * @imports routes/adminRoutes
 * @imports routes/commonRoutes
 */

import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminRoutes from './adminRoutes.js';

/**
 * Express Router instance for the protected routes.
 * @type {express.Router}
 */
const router = express.Router();


/**
 * Route for admin-related endpoints.
 * Requires authentication and authorization for admins.
 * @name /admin
 * @memberof module:routes/protectedRoutes
 */

export default router;

