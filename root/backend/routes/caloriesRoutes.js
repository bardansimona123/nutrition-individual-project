import express from 'express';
import Product from '../models/CalorieIntake.js'; // Asigură-te că ai modelul corect
const router = express.Router();

router.get('/foods', async (req, res) => {
    let { bloodType } = req.query;
  
    bloodType = parseInt(bloodType, 10); // Convertim bloodType la număr
  
    if (!bloodType || isNaN(bloodType) || bloodType < 1 || bloodType > 4) {
      return res.status(400).json({ error: 'Invalid or missing blood type. Blood type must be between 1 and 4.' });
    }
  
    try {
      const products = await Product.find();
  
      const nonRecommendedFoods = products.filter((product) => {
        const group = product.groupBloodNotAllowed[bloodType]; // bloodType este între 1 și 4, dar array-ul începe de la 0
        return group === true;
      });
  
      const nonRecommendedCategories = [...new Set(nonRecommendedFoods.map((food) => food.categories))];

  
      res.json({ nonRecommendedCategories });
    } catch (error) {
      console.error('Error fetching non-recommended foods:', error);
      res.status(500).json({ error: 'Error fetching products from the database' });
    }
  });
  

export default router;
