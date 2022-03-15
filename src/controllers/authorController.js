
const authorModel=require("../models/authorModel")
const BlogModel=require("../models/blogsModel")
const jwt = require("jsonwebtoken")

let createAuthors=async function(req,res){

    try{
        let data=req.body
        let createAuthor=await authorModel.create(data)
        res.status(201).send({data:createAuthor,status:true})

    }
    catch(err){
        res.status(500).send({msg:err.message})
    }


}

let authorLogin=async function (req,res){
    try{
        let email=req.body.email
        let password=req.body.password
        let author=await authorModel.findOne(({email:email,password:password}))
        if(!author){
            return res.status(400).send({msg:"author not available",status:true})
        }
        let tokenGen=jwt.sign(
            {
            authorId:author._id.toString(),
            project:"Blog",
            organisation:"functionUP"
        },
        "project-blog"
        
        );
        res.setHeader('x-auth-token',tokenGen)
        res.status(201).send({data:tokenGen,status:true})



    }
    catch(err){
        res.status(500).send({msg:err.messgage})
    }
}

module.exports.createAuthors=createAuthors
module.exports.authorLogin=authorLogin











