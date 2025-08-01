import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./route/user.route.js"
import authRoute  from "./route/auth.route.js"
dotenv.config()

const app = express()

app.use(express.json())

mongoose.connect(process.env.url).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)


app.use((err,req,res,next)=>{
    const statusCode =  err.statusCode || 500
    const message = err.message || "Internal SERVER ERROR"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.port}`)
})