import React, { useState } from 'react';
import DailyCalorieIntake from './DailyCalorieIntake';
import styles from './DailyCaloriesForm.module.css';

const DailyCaloriesForm = () => {
  const [formData, setFormData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '',
  });

  const [calories, setCalories] = useState(null);
  const [nonRecommendedFoods, setNonRecommendedFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBloodTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, bloodType: type }));
  };

  const calculateCalories = () => {
    const { height, age, currentWeight, desiredWeight } = formData;
    const bmr = 12 * currentWeight + 8 * height - 5 * age + 400;
    const caloricNeed = bmr + (desiredWeight - currentWeight) * 150;
    setCalories(Math.round(caloricNeed));
  };

  const fetchNonRecommendedFoods = async () => {
    try {
      const response = await fetch(`/routes/foods?bloodType=${formData.bloodType}`);
      const data = await response.json();
      setNonRecommendedFoods(data.nonRecommendedCategories || []);
    } catch (error) {
      console.error('Error fetching non-recommended foods:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateCalories();
    await fetchNonRecommendedFoods();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Calculate your daily calorie intake right now</h2>
        <div className={styles.field}>
          <label>Height</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="cm"
            required
          />
        </div>
        <div className={styles.field}>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="years"
            required
          />
        </div>
        <div className={styles.field}>
          <label>Current weight</label>
          <input
            type="number"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
            placeholder="kg"
            required
          />
        </div>
        <div className={styles.field}>
          <label>Desired weight</label>
          <input
            type="number"
            name="desiredWeight"
            value={formData.desiredWeight}
            onChange={handleChange}
            placeholder="kg"
            required
          />
        </div>
        <div className={styles.field}>
          <label>Blood Type</label>
          <div className={styles.bloodTypes}>
            {['1', '2', '3', '4'].map((type) => (
              <label key={type} className={styles.bloodTypeOption}>
                <input
                  type="radio"
                  name="bloodType"
                  value={type}
                  checked={formData.bloodType === type}
                  onChange={() => handleBloodTypeChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className={styles.button}>Start losing weight</button>
      </form>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>Close</button>
            <DailyCalorieIntake calories={calories} nonRecommendedFoods={nonRecommendedFoods} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCaloriesForm;
