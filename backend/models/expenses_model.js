const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        max: 255
    },
    amount:
    {
        type: Number,
        required: true,
        max: 10
    },
    category:
    {
        type: String,
        required: false,
        max: 255
    },
    description: {
        type: String,
        required: false,
        max: 255
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('expenseModel', ExpensesSchema, 'expenses');