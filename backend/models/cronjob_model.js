const mongoose = require('mongoose');

const CronjobModel = new mongoose.Schema({
    cronjob: {
        type: String,
        required: false,
        max: 255
    }

}, { timestamps: true, strict: true });

module.exports = mongoose.model('cronjobModel', CronjobModel, 'cronjobs');