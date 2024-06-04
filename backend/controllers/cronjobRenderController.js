const cronjobModel = require('../models/cronjob_model')

exports.addCronjob = async (req, res) => {
    const newCronjobExcecuted = new cronjobModel(req.body)
    try {
        const saveCronjob = await newCronjobExcecuted.save();
        res
            .status(201)
            .send({
                statusCode: 201,
                payload: "Cronjob saved successfully and your session has been restarted"
            })
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal Server Error!"
            })
    }

}

exports.getCronjob = async (req, res) => {
    try {
        const job = await cronjobModel.find();
        res
            .status(200)
            .send({ message: "YOU GOT ME :D" })
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
