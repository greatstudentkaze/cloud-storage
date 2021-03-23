import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';

import authRouter from './routes/auth.js';
import fileRouter from './routes/file.js';
import cors from './middlewares/cors.js';

const PORT = process.env.PORT;

const app = express();
app.use(cors);
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      return console.error('Добавь ссылку для подключения к MongoDB Cluster: https://cloud.mongodb.com/v2/605853587218fa42fc8adff3#clusters/connect?clusterId=Cluster0');
    }

    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
