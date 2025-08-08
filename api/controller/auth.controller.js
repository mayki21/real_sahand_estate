import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async(req, res,next) => {
    const { username, email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ username, email, password : hashPassword })
    try {
        await newUser.save()
        return res.status(200).json({message:"User Created Successfully"})
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}

export const signin = async (req, res, next) => {
     const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if(!validUser){
            return next(errorHandler(404, "User Not Found"))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandler(400, "Wrong Credentials"))
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET_KEY)
        const { password:pass , ...rest} = validUser._doc
        res
        .cookie("access_token", token, { httpOnly: true})
        .status(200)
        .json(rest);
        // return res.status(200).json({message:"User Logged In Successfully"})
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}