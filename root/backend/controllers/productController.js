import Product from '../models/Product.js';
import CalorieIntake from '../models/CalorieIntake.js';

export const getDailyIntakePublic = async (req, res) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.query;

    const dailyCalories = calculateCalories(height, age, currentWeight, desiredWeight, bloodType);
    const products = await Product.find({ bloodType: { $ne: bloodType } });

    res.json({ dailyCalories, notRecommendedProducts: products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily intake' });
  }
};

export const getDailyIntakePrivate = async (req, res) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

    const dailyCalories = calculateCalories(height, age, currentWeight, desiredWeight, bloodType);
    const products = await Product.find({ bloodType: { $ne: bloodType } });

    const intake = new CalorieIntake({
      user: req.user,
      dailyCalories,
      notRecommendedProducts: products,
    });

    await intake.save();
    res.json({ dailyCalories, notRecommendedProducts: products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save daily intake' });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({ name: new RegExp(query, 'i') });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search products' });
  }
};

export const addConsumedProduct = async (req, res) => {
  try {
    const { date, productId, quantity } = req.body;

    const intake = await CalorieIntake.findOne({ user: req.user, date });
    if (!intake) {
      const newIntake = new CalorieIntake({
        user: req.user,
        date,
        consumedProducts: [{ product: productId, quantity }],
      });
      await newIntake.save();
      return res.status(201).json(newIntake);
    }

    intake.consumedProducts.push({ product: productId, quantity });
    await intake.save();
    res.json(intake);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add consumed product' });
  }
};

export const deleteConsumedProduct = async (req, res) => {
  try {
    const { date, productId } = req.body;

    const intake = await CalorieIntake.findOne({ user: req.user, date });
    if (!intake) return res.status(404).json({ error: 'No intake found for this date' });

    intake.consumedProducts = intake.consumedProducts.filter(p => p.product.toString() !== productId);
    await intake.save();
    res.json(intake);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete consumed product' });
  }
};

export const getDailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    const report = await CalorieIntake.findOne({ user: req.user, date }).populate('consumedProducts.product');
    if (!report) return res.status(404).json({ error: 'No report found for this date' });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily report' });
  }
};

const calculateCalories = (height, age, currentWeight, desiredWeight, bloodType) => {
  // Formula de calcul personalizată (o poți înlocui cu ce logică dorești)
  return (10 * currentWeight + 6.25 * height - 5 * age + 5) + (bloodType * 10);
};
