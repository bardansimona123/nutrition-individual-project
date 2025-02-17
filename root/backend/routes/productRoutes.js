import express from 'express';
import Product from '../models/CalorieIntake.js';

const router = express.Router();

// Ruta GET pentru obținerea detaliilor produsului
router.get('/products', async (req, res) => {
  console.log('Received request with title:', req.query.title);  // Debugging log
  const { title } = req.query;
  try {
    const product = await Product.findOne({ title });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Error retrieving product');
  }
});


// Add new product
// Add new product (doar adăugare în lista locală, nu în baza de date)
router.post('/', (req, res) => {
  try {
    const newProduct = req.body;  // Primi produsul din cerere, dar nu îl salvezi
    res.status(201).json(newProduct);  // Răspunde cu produsul adăugat
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/api/products/:title', async (req, res) => {
  const { title } = req.params;  // Folosește `req.params` pentru parametrii din URL

  if (!title) {
    return res.status(400).send('Missing product title');
  }

  try {
    const product = await Product.findOneAndDelete({ title });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).send('Product deleted');
  } catch (error) {
    res.status(500).send('Error deleting product');
  }
});
