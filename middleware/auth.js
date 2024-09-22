const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    const {token} = req.cookies
    if(!token){
        res.status(403).send(`Pls login first`)
    }

    secretKey = process.env.SECRETKEY
    try{
        const decode = jwt.verify(token,secretKey)
        req.user = decode
    }catch(error){
        console.log(error)
        res.status(401).send(`Invalid token`)
    }
    
    return next()
}

module.exports = auth