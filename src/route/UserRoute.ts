import { verify } from "crypto"
import express,{Request,Response,NextFunction}from "express"
import { login, Register, VerifyUser } from "../controller/UserController"

const router  = express.Router()

router.post('/signup', Register)
router.post('/verifyUser/:signature', VerifyUser)
router.post('/login',login)



export default router