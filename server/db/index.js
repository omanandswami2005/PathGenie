import mongoose from 'mongoose';
import config from '../config/config.js';
/**
 * Connects to the MongoDB database.
 *
 * @return {Promise<void>} Promise that resolves when the connection is established.
 * @throws {Error} Throws an error if there is an issue connecting to the database.
 */
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.db.uri}`
    );
    console.log(
      'MongoDB connected...with host:',
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
