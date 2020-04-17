

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
        },
    receiverName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    receiverEmail: {
        type: String,
        required: true
    },
    receiverPhone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('event', authSchema);


