import User from "../model/user.model.mjs";
import jwt from "jsonwebtoken";
export const verifyUser = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    try {
        const {username, password} = req.body;
        const findUser = await User.findOne({username});
        if(!findUser){
            res.status(200).json({ message:`Not found user, ${username}`});
        }
        if(findUser.password !== password){
            res.status(200).json({message: 'Invalid password.'});
        }

        const token = jwt.sign({
            id: findUser._id,
            username: findUser.username,
            password: findUser.password
        }, JWT_SECRET, {expiresIn:'1h'});
        return res.status(200).json({
            message:"Authentication Successfully.",
            token: token,
            user:{
            username: findUser.username,
            role: findUser.role
            }
        });
    } catch (error) {
        console.log(error);
    }
}