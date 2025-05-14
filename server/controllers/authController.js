import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendVerificationEmail from '../utils/nodemailer.js';
import crypto from 'crypto';

import asyncHandler from '../utils/asyncHandler.js';
import { config } from 'dotenv';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import logger from '../utils/logger.js';
export default {
  checkAuth: asyncHandler(async (req, res) => {
    logger.info(req.user);

    res
      .status(200)
      .json(new ApiResponse(200, { ...req.user }, 'Authentication successful'));
  }),

 
};

