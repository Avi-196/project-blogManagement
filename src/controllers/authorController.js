
const authorModel=require("../models/authorModel")

const jwt = require("jsonwebtoken")

const createAuthors=async function(req,res){
    try{
        let data=req.body
    
        if(!data.firstname){
            return res.status(400).send({status:false,msg:"please provide the first name"})
        }
        if(!data.lastname){
            return res.status(400).send({status:false,msg:"please provid the last name"})
        }
        if(!data.title){
            return res.status(400).send({status:false,msg:"please provide the title"})
        }
  
        if(!data.email){
            return res.status(400).send({status:false,msg:"please provide the email"})
        }
        
        if(!data.password){
            return res.status(400).send({status:false,msg:"please provide the password"})
        }
        let email=await authorModel.findOne({email:data.email})
  
        if(email){
            return res.status(406).send({msg:"this email is already taken not acceptable"})
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
            return  res.status(404).send({ status: false, msg: "Invalid Email" })
           
          }
  
        let uniquePassword=await authorModel.findOne({password:data.password})
        if(uniquePassword){
            return res.status(406).send({msg:"this password already taken"})
        }     
        let createAuthor=await authorModel.create(data)
        res.status(201).send({status:true,data:createAuthor})
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}

const authorLogin=async function (req,res){
    try{
        let email=req.body.email
        let password=req.body.password
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(req.body.email))) {
            return  res.status(404).send({ status: false, msg: "Invalid Email" })   
          }
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
        res.header('x-api-key',tokenGen)
        res.status(201).send({status:true,data:tokenGen,})
    }
    catch(err){
        res.status(500).send({msg:err.messgage})
    }
}

module.exports.createAuthors=createAuthors
module.exports.authorLogin=authorLogin











