const jwt = require('jsonwebtoken')


const authentic = function (req, res, next) {
    try {

        let tokenGen = req.headers['x-api-key']
        if (!tokenGen) {
            return res.status(400).send("a token is required")
        }
        let decodetoken = jwt.verify(tokenGen, "project-blog")
        if (!decodetoken) {
            return res.status(404).send("can not access token")

        }

        req.user = decodetoken.authorId

        next()




    }
    catch (err) {
        res.status(401).send('authentication is missing')
    }


}

// const authorization = function (req, res, next) {

//     try {
//         let tokenGen = req.headers["x-api-key"]
//         if (!tokenGen)
//             return res.status(401).send({ status: false, msg: "Token not present" })

//         let decodetoken = jwt.verify(tokenGen, "project-blog")
//         if (!decodetoken)
//             return res.status(401).send({ status: false, msg: "Token is invalid" })

//         let userId = req.query.authorId
//         let authId = req.params.blogId
//         if (!userId)
//             return res.status(400).send({ status: false, msg: "Please Send Author Id" })

//         let userLoggedIn = decodetoken.authorId

//         if ((userId || authId) == userLoggedIn) {
//             next()

//         } else {
//             res.status(403).send({ status: false, msg: "User is not Allowed access the request" })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ status: false, msg: error.message })
//     }


// }



module.exports.authentic = authentic
// module.exports.authorization = authorization