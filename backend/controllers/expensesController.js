const moment = require("moment")
const expenseModel = require('../models/expenses_model')
const sharedExpense = require('../models/sharedExp_model')
exports.addExpense = async (req, res) => {
    const newExpense = new expenseModel(req.body)
    try {
        const saved = await newExpense.save();
        res
            .status(201)
            .send({
                statusCode: 201,
                payload: "Expense saved successfully"
            })
    } catch (e) {

        return res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal Server Error!"
            })
    }

}

exports.getExpenses = async (req, res) => {
    const user = req.params.id
    const { page = 1, pageSize = 5 } = req.query;
    try {
        const totalExpensesCount = await expenseModel.countDocuments({ userId: user });
        const expenses = await expenseModel.find({ userId: user })
            .limit(Number(pageSize))
            .skip((page - 1) * pageSize)
            .sort({ opDate: -1 })
        const totalPages = Math.ceil(totalExpensesCount / pageSize);
        res
            .status(200)
            .json({
                expenses,
                totalPages,
                currentPage: Number(page),
                totalExpenses: totalExpensesCount
            })

    } catch (e) {
        console.log(e)
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal Server Error"
            })
    }
}

exports.getTotalExpenses = async (req, res) => {
    const user = req.params.id
    try {
        const totalExpenses = await expenseModel.find({ userId: user });
        res
            .status(200)
            .send(totalExpenses)
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal server error"
            })

    }
}
exports.getTotalExpensesForShared = async (req, res) => {
    const user = req.params.id
    try {
        const totalExpenses = await expenseModel.find();
        res
            .status(200)
            .send(totalExpenses)
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal server error"
            })

    }
}

exports.getExpensesByDate = async (req, res) => {
    const id = req.params.id
    const { fromDate, toDate } = req.body;

    if (!fromDate || !toDate) {
        return res.status(400).json({ message: "Both fromDate and toDate are required." });
    }
    try {
        const expensesByDate = await expenseModel.find({ opDate: { $gte: fromDate, $lte: toDate }, userId: id })
        res
            .status(200)
            .json({ expensesByDate })
    } catch (e) {
        console.log(e)
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal Server Error"
            })

    }
}

exports.deleteExpense = async (req, res) => {
    const id = req.params.id
    try {
        //cancello anche la shared altrimenti le ma troverei nelle shared
        const sharedExpToDel = await sharedExpense.findOneAndDelete({ expenseId: id })
        const delExp = await expenseModel.findByIdAndDelete(id);
        if (!delExp) {
            return res.status(404).json({ statusCode: 404, message: "Expense not found." });
        }
        console.log("My exp: " + delExp);
        console.log("Shared exp: " + sharedExpToDel);
        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Expense successfully deleted!"
            })
    } catch (e) {
        console.log(e);
        res
            .status(500),
            send({
                statusCode: 500,
                message: "Internal Server Errior"
            })

    }
}