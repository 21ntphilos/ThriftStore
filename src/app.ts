import express,{Request,Response,NextFunction}from "express"
import logger from "morgan"
import Error  from "http-errors"
import cookieParser from "cookie-parser"
import AdminRouter from "./route/AdminRoute"
import UserRouter from './route/UserRoute'
import {db} from "./config/config"


const app = express()

//{force:true}
db.sync().then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
}).catch(err=>{
    console.log(err)
})

app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());

app.use('/users',UserRouter )
app.use('/admins',AdminRouter )


const port = 7070
app.listen(port,()=>{
    console.log(`Server Listening at port ${port}`)
})