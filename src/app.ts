import express, { Request, Response, NextFunction } from "express"
import logger from "morgan"
import Error from "http-errors"
import cookieParser from "cookie-parser"
import AdminRouter from "./router/AdminRoute"
import UserRouter from './router/UserRoute'
import indexRouter from './router/indexRoute';
import { db } from "./config/config"
import path from "path"



const app = express()

//{force:true}
db.sync().then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY")
}).catch(err => {
    console.log(err)
})

app.set('views', path.join(__dirname, "..", 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", 'public')));
// app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', UserRouter)
app.use('/admins', AdminRouter)


const port = 7070
app.listen(port, () => {
    console.log(`Server Listening at port ${port}`)
})