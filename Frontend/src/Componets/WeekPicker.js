import React, { useState, useEffect } from 'react';
import { startOfWeek, addWeeks, subWeeks, format, addDays, parseISO, differenceInCalendarWeeks } from 'date-fns';
import styles from './WeekPicker.module.css';

const WeekPicker = ({ onChange }) => {
  // Define the start date of the pay periods
  const payPeriodStartDate = parseISO("2023-01-01"); // Adjust this date to your needs

  // Function to calculate the start of the current pay period
  const calculateCurrentPayPeriodStart = () => {
    const today = new Date();
    const weeksSinceStart = differenceInCalendarWeeks(today, payPeriodStartDate, { weekStartsOn: 1 });
    const payPeriodsSinceStart = Math.floor(weeksSinceStart / 2); // Assuming each pay period is 2 weeks
    return addWeeks(payPeriodStartDate, payPeriodsSinceStart * 2);
  };

  const [selectedDate, setSelectedDate] = useState(calculateCurrentPayPeriodStart());

  useEffect(() => {
    // Update the pay period on component mount to ensure it's set to the current period
    updateWeeks(selectedDate);
  }, [selectedDate]);

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
    const newDate = subWeeks(selectedDate, 2);
    updateWeeks(newDate);
  };

  const handleNextClick = () => {
    const currentPayPeriodStart = calculateCurrentPayPeriodStart();
    if (selectedDate < currentPayPeriodStart) {
      const newDate = addWeeks(selectedDate, 2);
      updateWeeks(newDate);
    }
  };

  const formatDate = (date) => format(date, 'MM-dd-yy');

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
