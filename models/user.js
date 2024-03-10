
const { Schema, model } = require('mongoose');


const userSchema = Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    surname: {
        type: String,
        required: true,
        min: 7,
        max: 244
    },

    nickname: {
        type: String,
        required: true,
        min: 7,
        max: 244
    },

    email: {
        type: String,
        required: true,
        min: 7,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },

    role: {
        type: String,
        default: "role_users"
    },
    image: {
        type: String,
        default: "default.png"
    },

    created_at: {
        type: Date,
        default: Date.now
    }

});

//devolver el models
module.exports = model('User', userSchema);