const expenseModel = require('../models/expenses_model')

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
        console.log(e);
        ress
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal Server Error!"
            })
    }

}

exports.getExpenses = async (req, res) => {
    const { page = 1, pageSize = 5 } = req.query;
    try {
        const totalExpensesCount = await expenseModel.countDocuments();
        const expenses = await expenseModel.find()
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
            .status(500),
            send({
                statusCode: 500,
                message: "Internal Server Error"
            })
    }
}

exports.deleteExpense = async (req, res) => {
    const id = req.params.id
    const delExp = await expenseModel.findByIdAndDelete(id)
    try {
        res
            .status(200)
            .send({
                statusCode: 200,
                payload: "Expense successfully deleted!"
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