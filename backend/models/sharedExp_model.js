const mongoose = require('mongoose');

const SharedExpensesModel = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true,
        max: 255
    },
    expenseId: {
        type: String,
        required: true,
        ref: "expensesModel"
    },
    userSharedWithId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: [],
        ref: "usersModel"

    }],
    note: {
        type: String,
        max: 255
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('sharedExpenseModel', SharedExpensesModel, 'sharedExpenses');