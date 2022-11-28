import express, { Request, Response, NextFunction } from "express"


const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
    res.status(200).render('index', { title: 'Team Two || Campus Easy' });
})
router.get("/contact", async (req: Request, res: Response) => {
    res.status(200).render('contact');
})
router.get("/shop", async (req: Request, res: Response) => {
    res.status(200).render('shop');
})
router.get("/product", async (req: Request, res: Response) => {
    res.status(200).render('product');
})
router.get("/addproduct", async (req: Request, res: Response) => {
    res.status(200).render('addproduct');
})
router.get("/adminaccount", async (req: Request, res: Response) => {
    res.status(200).render('adminaccount');
})
router.get("/addproduct", async (req: Request, res: Response) => {
    res.status(200).render('addproduct');
})
router.get("/login", async (req: Request, res: Response) => {
    res.status(200).render('login');
})


export default router