import {DataTypes, Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize('app', '', '',{
    storage:"ThriftStores.sqlite",
    dialect:"sqlite",
    logging: false
})

export const APP_SECRET =  process.env.APP_SECRET!

export const accountSid = process.env.ACCOUNT_SID
export const authToken = process.env.AUTH_TOKEN
export const fromAdminPhone = process.env.TWILO_PHONE

export const GMAIL_USER = process.env.GMAIL_USER
export const GMAIL_PASS = process.env.GMAIL_PASS
export const AdminPhone = process.env.fromAdiminPhone
export const UserSubject = process.env.UserSubject as any
export const fromAdminMail = process.env.FromAdminMail  as any