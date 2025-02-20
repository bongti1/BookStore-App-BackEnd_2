import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).json({massage: "Denies to access, No token provided."})
    }
    jwt.verify(token, JWT_SECRET_KEY , (err, user) => {
        if(err){
            console.log(err);
            return res.status(401).json({message:"Invalid Credentail."});
        }
        req.user = user;
        next();
    })
}