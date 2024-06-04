

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401)
            .send({
                message: 'No token provided',
                statusCode: 401
            })
    }

    try {

        const verified = jwt.verify(token, process.env.MY_SECRET_KEY)
        req.user = verified;
        req.getPost = verified;
        next()
    } catch (e) {
        res.status(403)
            .send({
                statusCode: 403,
                message: "Your token is not valid or expired!"
            })
    }
}