/**
 * The main Express application.
 * @module app
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './utils/logger.js';
import constants from './constants.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

// Express app
const app = express();
const { morganFormat } = constants;
/**
 * Enable Cross-Origin Resource Sharing.
 */
app.use(
  cors({
    origin: constants.client,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
// Middleware
app.all("/api/auth/*", toNodeHandler(auth));

/**
 * Parses incoming requests with JSON payloads.
 */
app.use(express.json());



/**
 * Serve static files from the 'dist' directory.
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, 'public', 'dist')));



/**
 * Parses incoming requests with URL-encoded payloads.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Parses cookies from the request.
 */
app.use(cookieParser());

/**
 * Parses JSON payloads in the request.
 */
app.use(bodyParser.json());

/**
 * Middleware to log requests.
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/**
 * Middleware to Morgan logger.
 */
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

export default app;

