import React from 'react';
const expenseModel = require('../models/expenses_model');
const userModel = require('../models/user_model');

exports.addSharedExpense = async (req, res) => {
    try {
        const userToBeAdded = await userModel.findOne(req.body.email)
    } catch (e) {

    }
}

