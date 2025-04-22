import jwt from 'jsonwebtoken';

const authMiddelwear = (req, res, next) => {
    console.log("jflsdjflksdfl")
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'cant find any token' });
    }
   const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const user=jwt.decode(token);
    if (!user) {
        return res.status(401).json({ message: 'unautorize' });
    }
    console.log("user",user)
    req.body.user = user;
    next();
  
}
export default authMiddelwear;