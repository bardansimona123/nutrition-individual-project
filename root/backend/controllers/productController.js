
import Product from '../models/CalorieIntake.js';

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
