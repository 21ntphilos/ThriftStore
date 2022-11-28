import express from "express"
import { getAllProperties } from "../controller/AdminController"
import { login, Register, VerifyUser } from "../controller/UserController"

const router  = express.Router()

router.post('/signup', Register)
router.post('/verifyUser/:signature', VerifyUser)
router.post('/login',login)
router.get("/get-all-Properties", getAllProperties)



export default router