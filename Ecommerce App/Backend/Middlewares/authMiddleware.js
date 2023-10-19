import Jwt from 'jsonwebtoken';
import userModel from '../Models/userModel.js';
// Protected route token base

const requireSignIn = async(req, res, next) =>{
    try {
        const decode = Jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}


// adimin access
const isAdmin = async(req, res, next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if (user.roles !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            })

        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
    }
}

export  {requireSignIn, isAdmin};

