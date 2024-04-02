import React, { useState } from 'react';
import { startOfWeek, addWeeks, subWeeks, format, addDays, parseISO } from 'date-fns';
import styles from './WeekPicker.module.css'; // Import the CSS module

const WeekPicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(parseISO("2024-04-01"));

  const updateWeeks = (newDate) => {
    setSelectedDate(newDate);

    const firstWeekStart = startOfWeek(newDate, { weekStartsOn: 1 });
    const firstWeekEnd = addDays(firstWeekStart, 6);
    const secondWeekStart = addDays(firstWeekStart, 7);
    const secondWeekEnd = addDays(secondWeekStart, 6);

    onChange({
      firstWeek: { start: firstWeekStart, end: firstWeekEnd },
      secondWeek: { start: secondWeekStart, end: secondWeekEnd },
      beginning: {firstWeekStart},
      ending: {secondWeekEnd}
    });
  };

  const handlePrevClick = () => {
    // Move back by two weeks
    const newDate = subWeeks(selectedDate, 2);
    updateWeeks(newDate);
  };

  const handleNextClick = () => {
    // Move forward by two weeks and also stops at the current pay period.
    const currentWeekEnd = addDays(startOfWeek(new Date(), { weekStartsOn: 2 }), 6);
    if (selectedDate < currentWeekEnd) {
      const newDate = addWeeks(selectedDate, 2);
      updateWeeks(newDate);
    }
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
