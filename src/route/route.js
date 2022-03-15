const express=require('express');
const router=express.Router();

const authorController= require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleWare=require("../middleWare/middleWare")

router.post('/createAuthors',authorController.createAuthors)
router.post('/createBlogs',blogController.createBlogs)
router.get('/getBlogs',middleWare.tokenCheck ,blogController.getBlogs)
router.put('/updatedBlog/:blogId',middleWare.tokenCheck ,blogController.updatedBlog)
router.delete('/blogDeleted/:blogId',middleWare.tokenCheck,blogController.BlogDeleted)
router.delete('/deletByQuery',middleWare.tokenCheck,blogController.deleteByQuery)
router.post('/authorLogin',authorController.authorLogin)



module.exports=router;