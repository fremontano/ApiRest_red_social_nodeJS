
const { Schema, model } = require('mongoose');


const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },

    nickname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
module.exports = model('User', userSchema, "users");