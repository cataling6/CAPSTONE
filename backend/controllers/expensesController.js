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
    const expenses = await expenseModel.find()
    try {
        res
            .status(200)
            .send(expenses)
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