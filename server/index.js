import customEnv from 'custom-env';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import UserRouter from './routes/user.routes.js';
import cors from 'cors';

customEnv.env();

const { MONGO_URI, PORT, NODE } = process.env;

const app = express();

export const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.set('port', PORT);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('api/v1.0/auth/', UserRouter);

// export app for testing
export default app;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

const start = () => {
  mongoose
    .connect(MONGO_URI, dbOptions)
    .then(() => {
      console.log('Connected to database');
      
      // listen for db connection error event and log it to console only in dev environment
      let db = mongoose.connection;
      db.on('error', (err) => {
        if (NODE_ENV.match(/^dev/i)) {
          console.log(`Database connection error: ${err}`);
        }
      });

      // listen for db disconnection event, log it to console only in dev environment
      // and try reconnecting
      db.on('disconnected', () => {
        if (NODE_ENV.match(/^dev/i)) {
          console.log('Database disconnected. Will try to reconnect.');
        }
        start();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

start();
