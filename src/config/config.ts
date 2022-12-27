import {DataTypes, Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
const HOST = process.env.DB_HOST
const DBusername = process.env.DB_USERNAME!
const password  = process.env.DB_PASSWORD

// export const db = new Sequelize(DBusername, DBusername, password, {
//     host: HOST,
//     port: 5432,
//     storage:"ThriftStores.pg",
//     dialect:"postgres",
//     // logging: false
// })

export const db = new Sequelize(process.env.DB_URL!,{logging:false})

export const connectDB = async () => {
   try {
        await db.sync()
        console.log("DATABASE CONNECTED SUCCESSFULLY")
    } catch (err) {
        console.log(err)
    }
    
}
export const APP_SECRET =  process.env.APP_SECRET!

export const accountSid = process.env.ACCOUNT_SID
export const authToken = process.env.AUTH_TOKEN
export const fromAdminPhone = process.env.TWILO_PHONE

export const GMAIL_USER = process.env.GMAIL_USER
export const GMAIL_PASS = process.env.GMAIL_PASS
export const AdminPhone = process.env.fromAdiminPhone
export const UserSubject = process.env.UserSubject as any
export const fromAdminMail = process.env.FromAdminMail  as any