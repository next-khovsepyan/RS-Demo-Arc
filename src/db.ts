import mongoose from 'mongoose';
import { DB_URI } from './config';
import logger from './utils/logger';

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private db: mongoose.Connection;

  private constructor() {
    mongoose.set('debug', false);
    this.db = mongoose.connection;

    this.db.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    this.db.once('open', () => {
      logger.info('MongoDB connected!');
    });
  }

  public static getInstance(): MongoDBConnection {
    if (!this.instance) {
      this.instance = new MongoDBConnection();
    }
    return this.instance;
  }

  public connect(): void {
    mongoose.connect(DB_URI).catch((err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });
  }

  public getConnection(): mongoose.Connection {
    return this.db;
  }
}

export default MongoDBConnection.getInstance();
