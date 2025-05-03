import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

export const app = express()

app.use(express.json({limit:"500kb"}))
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


//routes
import {route as authRoute} from "./routes/auth.route.js"
import {route as postRoute} from "./routes/post.route.js"

app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)