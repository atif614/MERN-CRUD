const jwt = require("jsonwebtoken");
const SECRETKEY = 'e-commerce Key';

const fetchUser = (req, res, next) => {
    // let token = req.header("authorization");
    // token = token.split(' ')[1];
    // console.log(token);
    // if(!token){
    //     res.status(401).json({error:"Please authenticate using a valid token"})
    // }
    // const verifiedToken = JWT.verify(token, SECRETKEY);
    // console.log(Request.user);
    // req.user = verifiedToken;
    // console.log(req.user)
    // next();
    try {
        const authHeader = req.header("authorization");
        console.log(authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No or malformed token provided' });
        }
        const token = authHeader.split(' ')[1];
        // 🔐 Verify the token
        const decoded = jwt.verify(token, SECRETKEY); // throws if expired or invalid
        req.user = decoded; // Attach user info to request
        console.log(decoded);
        console.log(req.user.user._id);
        // return;
        next();

    } catch (err) {
        // 🔍 Specific error handling
        // console.log("Error",err)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please login again.' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token.' });
        } else {
            console.error('JWT Error:', err);
            return res.status(500).json({ error: 'Authentication failed.' });
        }
    }
}
    module.exports = fetchUser;