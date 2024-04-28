// THIS FILE IS A PAY PERIOD FOR AUTO PAY PERIOD GENERATION IN THE DATABASE
const mongoose = require('mongoose');

// schema for pay period 
const payPeriodSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    recurrence: { type: String, enum: ['biweekly'], default: 'biweekly' },
});

const PayPeriod = mongoose.model('PayPeriod', payPeriodSchema);




module.exports =  PayPeriod ;