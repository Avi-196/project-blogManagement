  const jwt=require ('jsonwebtoken')
  const middleWare=require("../middleWare/middleware")
  
  const tokenCheck=function(req,res,next){
     try{

        let tokenGen=req.headers['x-auth-token']
        if(!tokenGen){
            return res.status(400).send("a token is required")
        }
        let decodetoken=jwt.verify(tokenGen ,"project-blog")
        if(!decodetoken){
            return res.status(404).send("can not access token")

        }

        return next()




     }
      catch(err){
          res.status(401).send('authentication is missing')
      }


  }

  module.exports.tokenCheck=tokenCheck