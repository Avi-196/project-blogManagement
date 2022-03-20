const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema({

    title: { type: String, required: true,trim:true },
    body: { type: String, required: true,trim:true },
    authorId: {
        type: ObjectId, required:true, ref: "Author"
    },
    tags: [{type:String,trim:true}],
    category:{type: String, required:true,trim:true},
    subcategory:[{type:String,trim:true}],
    isDeleted: {
        type: Boolean,
        default: false
    },
   
    isPublished: {
        type: Boolean,
        deafault: false
    },
    PublishedAt:{
        type:Date,
        default:null
    },
    deletedAt:{type:Date,default:null},


}, { timestamps: true });

module.exports = mongoose.model('Blogs', BlogSchema)

