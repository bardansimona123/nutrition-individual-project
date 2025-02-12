import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './root/backend/routes/authRoutes.js';
import caloriesRoutes from './root/backend/routes/caloriesRoutes.js';
import productRoutes from './root/backend/routes/productRoutes.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/routes', caloriesRoutes);
app.use('/api/products', productRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
