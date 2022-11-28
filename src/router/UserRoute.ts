import { verify } from "crypto"
import express, { Request, Response, NextFunction } from "express"
import { login, Register, VerifyUser } from "../controller/UserController"

const router = express.Router()

router.get('/register', async (req: Request, res: Response) => {
    res.status(200).render('register', { title: 'Team Two || Campus Easy' })
})
router.get('/login', async (req: Request, res: Response) => {
    res.status(200).render('login')
})
router.post('/signup', Register)
router.post('/verifyUser/:signature', VerifyUser)
router.post('/login', login)



export default router