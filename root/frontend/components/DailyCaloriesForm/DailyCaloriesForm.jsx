import React, { useState } from 'react';
import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
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
      const response = await fetch(`http://localhost:5000/routes/foods?bloodType=${formData.bloodType}`);

      const data = await response.json();
      console.log(data);
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
        <h2 className={styles.title}>Calculate your daily calorie intake right now</h2>
        
        <div className={styles.fieldsContainer}>
          <div className={styles.column}>
            <div className={styles.field}>
              <label className={styles.label}>Height*</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label}>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label}>Current weight *</label>
              <input
                type="number"
                name="currentWeight"
                value={formData.currentWeight}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.field}>
              <label className={styles.label}>Desired weight *</label>
              <input
                type="number"
                name="desiredWeight"
                value={formData.desiredWeight}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label}>Blood type *</label>
              <input className={styles.input} disabled /> {/* Linie sub Blood Type */}
            </div>

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
      <span className={styles.bloodTypeCircle}>
        {formData.bloodType === type && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" fill="#FC842D" />
          </svg>
        )}
      </span>
      <span className={styles.bloodTypeNumber}>{type}</span>
    </label>
  ))}
</div>


          </div>
        </div>

        <button type="submit" className={styles.button}>Start losing weight</button>
      </form>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <DailyCalorieIntake 
              calories={calories} 
              nonRecommendedFoods={nonRecommendedFoods} 
              onClose={closeModal} 
            />
          </div>
        </div>
      )}


      

    </div>
  );
};

export default DailyCaloriesForm;
