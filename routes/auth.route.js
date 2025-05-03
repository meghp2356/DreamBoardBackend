import { registor , login , logout } from "../controller/auth.controller.js";
import verifyToken from "../middleware/verifyUser.middleware.js";
import express from "express"

const route = express.Router()

route.post("/registor",registor)
route.post("/login",login)
route.post("/logout",verifyToken,logout)

export {route}