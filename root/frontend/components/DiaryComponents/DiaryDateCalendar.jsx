import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DiaryDateCalendar = ({ setSelectedDate }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate); // Actualizează data selectată în componenta părinte
  };

  return (
    <div className="diary-date-calendar">
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
    </div>
  );
};

export default DiaryDateCalendar;
