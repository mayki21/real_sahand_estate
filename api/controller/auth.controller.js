import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js"

export const signup=  async(req, res,next) => {
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