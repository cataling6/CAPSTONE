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
        const expenseToShare = await expenseModel.findById({ _id: req.body.expenseId })
        const checkExpenseToShare = await sharedExpenseModel.findOne({ expenseId: req.body.expenseId })
        //questo mi servirà a riga 44 x valutare se spesa già condivisa con utente oppure no
        const checkUserShared = await sharedExpenseModel.findOne({ userSharedWithId: userToBeAdded._id })

        //se la spesa che voglio condividere è gia stata condivisa, aggiungo solo uil nuovo utente con cui condividerla, altrimenti ne aggiungo una nuova
        if (checkExpenseToShare) {
            if (!checkUserShared) {
                await sharedExpenseModel.updateOne({ _id: checkExpenseToShare._id }, { $push: { userSharedWithId: userToBeAdded } })
            } else {
                return res
                    .status(208)
                    .send({
                        statusCode: 208,
                        message: "Expense already shared with the user!"
                    })
            }
        } else {
            const newSharedExpense = new sharedExpenseModel({
                ...req.body,
                expenseId: expenseToShare._id,
                userSharedWithId: userToBeAdded
            })
            await newSharedExpense.save()

        }

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

exports.deleteSharedExpense = async (req, res) => {
    const expenseId = req.params.id
    try {
        await sharedExpenseModel.findOneAndDelete({ expenseId: expenseId })
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

exports.getSharedExpenses = async (req, res) => {
    try {
        const sharedExpenses = await sharedExpenseModel.find();
        res
            .status(200)
            .send({
                statusCode: 200,
                payload: sharedExpenses
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

exports.getMySharedExpenses = async (req, res) => {
    const userId = req.params.id
    try {
        const myShared = await sharedExpenseModel.find({ ownerId: userId })
        res
            .status(200)
            .send({
                statusCode: 200,
                payload: myShared
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

exports.getSharedExpensesWithMe = async (req, res) => {
    const userId = req.params.id
    try {
        const sharedWithMe = await sharedExpenseModel.find({ userSharedWithId: userId })
        res
            .status(200)
            .send({
                statusCode: 200,
                payload: sharedWithMe
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