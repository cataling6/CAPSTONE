const userModel = require('../models/user_model')
const bcrypt = require('bcrypt')

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res
            .status(200)
            .send(users)
    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
        console.log(e);
    }
}

exports.createUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt)
    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPwd
    });
    try {
        const saveUser = newUser.save()
        res
            .status(201)
            .send({
                statusCode: 201,
                payload: "User successfully created!"
            })
    } catch (e) {
        res
            .status(500)
        send({
            statusCode: 500,
            message: "Internal server error"
        })
        console.log(e);

    }
}

exports.deleteUserById = async (req, res) => {
    const userIdToBeDeleted = req.params.id
    try {
        await userModel.findByIdAndDelete(userIdToBeDeleted)
        res
            .status(200)
            .send({
                statusCode: 200,
                payload: "User successfully deleted!"
            })
    } catch (e) {
        res
            .status(501)
            .send({
                statusCode: 501,
                message: "Internal server error"
            })
        console.log(e);

    }
}