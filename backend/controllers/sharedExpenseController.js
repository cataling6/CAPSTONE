import React from 'react';
const expenseModel = require('../models/expenses_model');
const sharedExpenseModel = require('../models/sharedExp_model')
const userModel = require('../models/user_model');

exports.addSharedExpense = async (req, res) => {
    try {
        const userToBeAdded = await userModel.findOne({ email: req.body.email })

        if (!userToBeAdded) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "Sorry, user not found!"
                })
        }
        const expenseToShare = await sharedExpenseModel.findById({ _id: req.body.expenseId })
        const newSharedExpense = new sharedExpenseModel({
            ...req.body,
            expenseId: expenseToShare._id,
            userSharedWithId: userToBeAdded._id
        })

        await newSharedExpense.save()
        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Expense successfully shared!"
            })
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal Server Error"
            })
    }

}

exports.dellSharedExpense = async (req, res) => {
    try {
        await sharedExpenseModel.findByIdAndDelete({ expenseId: req.body.expenseId })
        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Shared expense successfully deleted!"
            })
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal Server Error"
            })
    }
}

