/**
 * Configuration module for the server.
 * Contains various configurations for the server application.
 * @module config
 */

// Importing dotenv module for environment variable loading
import dotenv from 'dotenv';
dotenv.config();

/**
 * Configuration object for the server application.
 * @constant
 * @type {Object}
 * @property {number} port - The port number on which the server will run. Defaults to 3000.
 * @property {Object} db - Configuration for the database connection.
 * @property {string} db.uri - The URI for the database connection.
 */
const config = {
  port: process.env.PORT || 5000,
  db: {
    uri: process.env.MONGODB_URI,
  }
};

export default config;

