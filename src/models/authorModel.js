const mongoose = require('mongoose')
const validator=require("validator")
const AuthorSchema = new mongoose.Schema({

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
        validate:{
            validator: function(email){return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
        },message:"please fill the valid email address",
                isAsync: false
            
            }
    
        
        
    },
    password: {
        type: String,
        unique: true,
        required: true

    }

}, { timestamps: true });

module.exports = mongoose.model('Author', AuthorSchema)
