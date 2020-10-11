const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    // const token = req.header('Auth-Token');
    const token = req.cookies.token
    if(!token) return res.status(401).send({error: 'Please Login to Proceed'});

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err){
        res.status(400).send({error: 'Invalid Token'});
    }

}