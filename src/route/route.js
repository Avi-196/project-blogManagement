const express=require('express');
const router=express.Router();

const authorController= require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleWare=require("../middleWare/middleWare")

router.post('/createAuthors',authorController.createAuthors)
router.post('/createBlogs',middleWare.authentic,blogController.createBlogs)
router.get('/getBlogs',middleWare.authentic,blogController.getBlogs)
router.put('/updatedBlog/:blogId',middleWare.authentic,blogController.updatedBlog)
router.delete('/blogDeleted/:blogId',middleWare.authentic,blogController.blogDeleted)
router.delete('/deletByQuery',middleWare.authentic,blogController.deleteByQuery)
router.post('/authorLogin',authorController.authorLogin)



module.exports=router;