const mongoose = require('mongoose');

// schema for pay period 
const payPeriodSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    recurrence: { type: String, enum: ['biweekly'], default: 'biweekly' },
});

const PayPeriod = mongoose.model('PayPeriod', payPeriodSchema);

// calc biweekly 
async function createBiWeeklyPayPeriod() {
    
    try {
        let lastEndDate = new Date('2024-3-18');
        // find last day 
        const lastPayPeriod = await PayPeriod.findOne().sort({ endDate: -1 }).exec();
        if (lastPayPeriod) {
            lastEndDate = lastPayPeriod.endDate;
        }

        //calc dates (2 weeks)
        const startDate = lastEndDate ? new Date(lastEndDate) : new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14);

        //save new pay period
        const newPayPeriod = new PayPeriod({
            startDate: startDate,
            endDate: endDate
        });
        await newPayPeriod.save();

        return newPayPeriod;
    } catch (error) {
        console.error('Error creating the pay period:', error);
        throw error;
    }
}

module.exports = { PayPeriod, createBiWeeklyPayPeriod };
