const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionOptionSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            unique: true,
        },
        correct: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,

    }

);
module.exports = mongoose.model("Question", questionOptionSchema);