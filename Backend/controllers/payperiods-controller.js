const mongoose = require("mongoose");
const Timesheet = require("../models/timeSheet");
const User = require("../models/User");
const PayPeriod = require("../models/PayPeriod");


async function createTimesheetPayPeriod() {
    try {
        // Find the last end date of the previous pay period
        let lastEndDate = new Date('2024-3-03');
        const lastPayPeriod = await PayPeriod.findOne().sort({ endDate: -1 }).exec();
        if (lastPayPeriod) {
            lastEndDate = lastPayPeriod.endDate;
        }

        // Get the current date
        const currentDate = new Date();

        // Check if the current date is greater than the end date of the last pay period
        if (currentDate > lastEndDate) {
            // Calculate the start date of the new pay period (1 day after the end date of the last one)
            const startDate = new Date(lastEndDate);
            startDate.setDate(startDate.getDate() + 1);

            // Calculate the end date of the new pay period (14 days after the start date)
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 13);
            
            startDate.setUTCHours(0, 0, 0, 0);
            endDate.setUTCHours(0, 0, 0, 0);

            // Create the new pay period
            const newPayPeriod = new PayPeriod({
                startDate: startDate,
                endDate: endDate
            });
            await newPayPeriod.save();

            // Create timesheets for each user within the new pay period
            const users = await User.find();
            for (const user of users) {
                // Loop through each date in the new pay period
                for (let currentDateIterator = new Date(startDate); currentDateIterator <= endDate; currentDateIterator.setDate(currentDateIterator.getDate() + 1)) {
                    const currentDate = new Date(currentDateIterator); // Create a new Date object for each iteration
                    currentDate.setUTCHours(0, 0, 0, 0);
                    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day of the week

                    // Create a new timesheet entry for each date
                    const newTimesheet = new Timesheet({
                        day: dayOfWeek,
                        date: currentDate,
                        project: "",
                        regular: "",
                        overtime: "",
                        employeeID: user.email,
                        clockIn1: "",
                        clockOut1: "",
                        clockIn2: "",
                        clockOut2: "",
                        clockIn3: "",
                        clockOut3: ""
                    });
                
                    await newTimesheet.save();
                    console.log(`Timesheet created for user ${user.email}:`, newTimesheet);
                }
            }
        } else {
            console.log("Current date is not greater than the last pay period's end date. Skipping timesheet creation.");
        }

    } catch (error) {
        console.error('Error creating the pay period and timesheet pay periods:', error);
        throw error;
    }
}

exports.createTimesheetPayPeriod = createTimesheetPayPeriod;





