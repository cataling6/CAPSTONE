const mongoose = require('mongoose');

const CategoryModel = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        max: 255
    },
    icon: {
        type: String,
        required: false,
        max: 255
    },
    color: {
        type: String,
        required: true,
        max: 255
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('categoryModel', CategoryModel, 'categories');