import express from 'express';
import { searchProducts, addConsumedProduct, deleteConsumedProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/search', searchProducts); // Căutarea produselor
router.post('/consume', addConsumedProduct); // Adăugarea unui produs consumat
router.post('/delete-consumed', deleteConsumedProduct); // Ștergerea unui produs consumat

export default router;
