import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';

const app = express();
const PORT = process.env.PORT;

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
