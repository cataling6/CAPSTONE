const categoryModel = require('../models/category_model')

exports.addCategory = async (req, res) => {
    const newCategory = new categoryModel(req.body)
    try {
        const saveCategory = await newCategory.save();
        res
            .status(201)
            .send({
                statusCode: 201,
                payload: "Category saved successfully"
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

exports.getCategory = async (req, res) => {
    const categories = await categoryModel.find();
    try {
        res
            .status(200)
            .send(categories)
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

exports.deleteCategory = async (req, res) => {
    const id = req.params.id
    const delCat = await categoryModel.findByIdAndDelete(id);
    try {
        res
            .status(200)
            .send({
                statusCode: 200,
                payload: "Category successfully deleted!"
            })
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Internal Server Error!"
            })
    }
}