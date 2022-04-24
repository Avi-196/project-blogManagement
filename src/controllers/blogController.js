const authorModel = require("../models/authorModel")
const blogModel=require("../models/blogsModel")

const createBlogs=async function(req,res){
    try{
    let data=req.body
    if(data.isPublished==true){
        data.PublishedAt=new Date()
    }

     let authorId=data.authorId
     let authorReq=await authorModel.findById(authorId)
     if(req.user!=authorId){
        return res.status(401).send({msg:"you are not authorized"})
    }
     if(authorReq){

    let BlogsCreated=await blogModel.create(data)
    res.status(201).send({data:BlogsCreated,status:true})

}else{
    res.status(400).send({msg:"please enter the right authorId",status:false})

}
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}

const getBlogs=async function(req,res){
  
    try{
     let authorId=req.query.authorId
     let category=req.query.category
     let tags=req.query.tags
     let subcategory=req.query.subcategory
     let blogs=await blogModel.find({$or:[{authorId:authorId},{category:category},{tags:tags},{subcategory:subcategory}]})
     let array=[]
     if(blogs.length>0){
         for(let element of blogs){
             if (element.isDeleted===false && element.isPublished===true){

                array.push(element)
             }
         }
         res.status(200).send({data:array,status:true})
     }else{
         res.status(400).send({status:false,msg:"this blog is not avilable"})
     }
    }
     catch(err){
         res.status(500).send({msg:err.message,status:false})
     }
    
}

const updatedBlog = async function (req, res) {
    try {
        const id = req.params.blogId;     
        const data = req.body;
        const fetchData = await blogModel.findById(id);
      let authId=fetchData.authorId
      console.log(authId,req.user)
      if(req.user!=authId){
          return res.status(401).send({msg:"you are not authorized"})
      }
        if (fetchData.isPublished) {
        
        data.publishedAt = new Date();
        data.isPublished = true
        const dataRes = await blogModel.findByIdAndUpdate(id, data, {
            new: true
        });
        return res.status(200).send({
            status: true,
            msg: dataRes
        });
    }
      return res.status(404).send({
             status: false,
             message: "blog not found"
         });
        }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}


const blogDeleted = async function (req, res) {
    try {
        let id = req.params.blogId
        let data = await blogModel.findById(id)
        let bgId=data.authorId
        console.log(bgId,req.user)
        if(req.user!=bgId){
            return res.status(401).send({msg:"you are not authorized"})
        }      
        if (data) {
            if (data.isDeleted == false) {
                 let data2 = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt:new Date() }, { new: true })
             return   res.status(200).send({ status: true, msg: data2 })
            } else {
              return  res.status(200).send({ status: false, msg: "data already deleted" })
            }
        } else {
          return  res.status(404).send({ status: false, msg: "id does not exist" })
        }
    }
    catch (err) { 
      return res.status(500).send({status:false, message:err.message }) }
}


const deleteByQuery = async function (req, res) {
    try {
        let obj = {};
        if (req.query.category) {
          obj.category = req.query.category;
        }
        if (req.query.authorId) {
          obj.authorId = req.query.authorId;
        }
        if (req.query.tag) {
          obj.tags = req.query.tags;
        }
        if (req.query.subcategory) {
          obj.subcategory = req.query.subcategory;
        }
        if (req.query.published) {
          obj.isPublished = req.query.isPublished;
        }
        obj.authorId = req.userId
        let data = await blogModel.findOne(obj);
        if (!data) {
          return res.status(404).send({ status: false, message: "data not found" });
        }
       if(req.userId !==data.authorId){
         return res.status(401).send({status:false,msg:"you are not authorized"})
       }

          if (data.isDeleted == false) {     
            data.isDeleted = true;
            data.deletedAt = Date();
            data.save();
           return res.status(200).send({ status: true, data: data });
          } else {
           return res.status(400).send({ status: false, message: "This blog is already deleted" });
          }
      } catch (error) {
        return res.status(500).send({ message: err.message });
      }
    }
  

module.exports.createBlogs=createBlogs
module.exports.getBlogs=getBlogs
module.exports.updatedBlog=updatedBlog
module.exports.blogDeleted=blogDeleted
module.exports.deleteByQuery=deleteByQuery