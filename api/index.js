import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./route/user.route.js"
dotenv.config()

const app = express()

mongoose.connect(process.env.url).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.use("/api/user", userRoute)

app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.port}`)
})