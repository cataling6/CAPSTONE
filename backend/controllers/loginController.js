const userModel = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const userLogin = await userModel.findOne({
            email: req.body.email
        })

        if (!userLogin) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "Sorry, user not found!"
                })
        }

        const verifyPwd = await bcrypt.compare(req.body.password, userLogin.password)
        if (!verifyPwd) {
            return res
                .status(401)
                .send({
                    statusCode: 401,
                    message: "Unauthorized access!"
                })
        }

        const token = jwt.sign({
            email: userLogin.email,
            firsName: userLogin.firstName,
            lastName: userLogin.lastName,
            imgProfile: userLogin.imgProfile,
            userId: userLogin._id,
            role: userLogin.role,
        }, process.env.MY_SECRET_KEY, {
            expiresIn: '24h'
        })

        res
            .header('authorization', token)
            .status(200)
            .send({
                statusCode: 200,
                token,
                message: "Login successful ;) "
            })

    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })

    }
}