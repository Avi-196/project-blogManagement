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


module.exports.authentic = authentic