import React, { useState } from 'react';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, addDays } from 'date-fns';
import styles from './WeekPicker.module.css'; // Import the CSS module

const WeekPicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(addWeeks(new Date(), 1)); // Start one week ahead

  const updateWeeks = (newDate) => {
    setSelectedDate(newDate);

    const firstWeekStart = startOfWeek(newDate, { weekStartsOn: 1 });
    const firstWeekEnd = addDays(firstWeekStart, 13);
    const secondWeekStart = addDays(firstWeekStart, 14);
    const secondWeekEnd = addDays(secondWeekStart, 13);

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
          Weeks of: {formatDate(startOfWeek(selectedDate, { weekStartsOn: 1 }))} - {formatDate(addDays(startOfWeek(selectedDate, { weekStartsOn: 1 }), 13))}
        </div>
        <button className={`${styles.arrowButton} ${styles.rightArrow}`} onClick={handleNextClick}></button>
      </div>
    </div>
  );
};

export default WeekPicker;
