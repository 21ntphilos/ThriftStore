import express,{Request,Response,NextFunction}from "express"
import { vendorLogin, VendorRegister } from "../controller/VendorController"

const router  = express.Router()

router.post('/register', VendorRegister)
router.post('/login', vendorLogin)


export default router