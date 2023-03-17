var jwt = require('jsonwebtoken'); // to create json tokens for secure client-server connection
const JWT_secret = `${process.env.SECRET_KEY}`;

const fetchuser = (req, res, next) => {
     //  Get user from jwt token and add user id to req obj
     const token = req.header('auth-token');
     if(!token){
          res.status(401).send({error: "Access denied: Please authenticate with valid token"});
     }
     try {
          const data = jwt.verify(token, JWT_secret);
          req.user = data.user;
          next();
          
     } catch (error) {
          res.status(401).send({error: "Access denied: Please authenticate with valid token"});
     }
}


module.exports = fetchuser;