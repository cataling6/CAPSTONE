const mongoose = require('mongoose');

const CategoryModel = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        max: 255
    },
    userId: {
        type: String,
        required: true,
        maxx: 255
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
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false
    },
    owner: {
        type: String,
        default: "default"
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('categoryModel', CategoryModel, 'categories');