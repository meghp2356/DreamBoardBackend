import jwt from "jsonwebtoken";

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies["access-token"] ||  req.headers['authorization']?.split(' ')[1];
      
        if (!token) {
          return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
      
        await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
          if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
          }
         
          req.userId = user.id; // Attach the decoded payload to the request
         
          next(); // Proceed to the next middleware or route
        });
    } catch (error) {
        res.status(500).json({message : error.message})
    }
  }

export default verifyToken