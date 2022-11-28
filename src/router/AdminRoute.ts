import express,{Request,Response,NextFunction}from "express"
import { AdminRegister, getAllUsers, SuperAdminRegister } from "../controller/AdminController"
import { auth } from "../middleware/auth";

const router  = express.Router()
router.post("/create-super-admin", SuperAdminRegister)
router.post("/create-admin", auth, AdminRegister);
router.get("/get-all-users", auth, getAllUsers);


export default router