import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './root/backend/routes/authRoutes.js';
import caloriesRoutes from './root/backend/routes/caloriesRoutes.js';
import productRoutes from './root/backend/routes/productRoutes.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs'; 

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/routes', caloriesRoutes);
app.use('/api/products', productRoutes);

// Citirea fișierului swagger.yaml
const swaggerDocument = yaml.load(fs.readFileSync('./root/backend/swagger.yaml', 'utf8'));

// Servește Swagger UI la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
