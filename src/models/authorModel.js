const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({

    firstname: { type: String, required: true,trim:true },
    lastname: { type: String, required: true,trim:true },
    title: {
        type: String, required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        trim:true,
        unique: true,
        lowercase: true,
        required: 'email address is required',     
    },
    password:{
        required:true,
        type:String
    }

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)
