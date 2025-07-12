import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

export const signup=  async(req, res) => {
    const { username, email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ username, email, password : hashPassword })
    try {
        await newUser.save()
        return res.status(200).json({message:"User Created Successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}