import React, { useState } from 'react';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format } from 'date-fns';
import styles from './WeekPicker.module.css'; // Import the CSS module

const WeekPicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const updateWeeks = (newDate) => {
    setSelectedDate(newDate);

    const firstWeekStart = startOfWeek(newDate, { weekStartsOn: 1 });
    const firstWeekEnd = endOfWeek(newDate, { weekStartsOn: 1 });
    const secondWeekStart = startOfWeek(addWeeks(newDate, 1), { weekStartsOn: 1 });
    const secondWeekEnd = endOfWeek(addWeeks(newDate, 1), { weekStartsOn: 1 });

    onChange({
      firstWeek: { start: firstWeekStart, end: firstWeekEnd },
      secondWeek: { start: secondWeekStart, end: secondWeekEnd }
    });
  };

  const handlePrevClick = () => {
    // Move back by two weeks
    const newDate = subWeeks(selectedDate, 2);
    updateWeeks(newDate);
  };

  const handleNextClick = () => {
    // Move forward by two weeks
    const newDate = addWeeks(selectedDate, 2);
    updateWeeks(newDate);
  };

  const formatDate = (date) => format(date, 'MM-dd-yy'); // Format the date as month-date-year (last two digits)

  return (
    <div className={styles.weekPicker}>
      <div className={styles.innerContainer}>
        <button className={`${styles.arrowButton} ${styles.leftArrow}`} onClick={handlePrevClick}></button>
        <div className={styles.weekDisplay}>
          Weeks of: {formatDate(startOfWeek(selectedDate, { weekStartsOn: 1 }))} - {formatDate(endOfWeek(addWeeks(selectedDate, 1), { weekStartsOn: 1 }))}
        </div>
        <button className={`${styles.arrowButton} ${styles.rightArrow}`} onClick={handleNextClick}></button>
      </div>
    </div>
  );
};

export default WeekPicker;
