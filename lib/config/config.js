"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromAdminMail = exports.UserSubject = exports.AdminPhone = exports.GMAIL_PASS = exports.GMAIL_USER = exports.fromAdminPhone = exports.authToken = exports.accountSid = exports.APP_SECRET = exports.connectDB = exports.db = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const HOST = process.env.DB_HOST;
const DBusername = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
// export const db = new Sequelize(DBusername, DBusername, password, {
//     host: HOST,
//     port: 5432,
//     storage:"ThriftStores.pg",
//     dialect:"postgres",
//     // logging: false
// })
exports.db = new sequelize_1.Sequelize(process.env.DB_URL, { logging: false });
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.db.sync();
        console.log("DATABASE CONNECTED SUCCESSFULLY");
    }
    catch (err) {
        console.log(err);
    }
});
exports.connectDB = connectDB;
exports.APP_SECRET = process.env.APP_SECRET;
exports.accountSid = process.env.ACCOUNT_SID;
exports.authToken = process.env.AUTH_TOKEN;
exports.fromAdminPhone = process.env.TWILO_PHONE;
exports.GMAIL_USER = process.env.GMAIL_USER;
exports.GMAIL_PASS = process.env.GMAIL_PASS;
exports.AdminPhone = process.env.fromAdiminPhone;
exports.UserSubject = process.env.UserSubject;
exports.fromAdminMail = process.env.FromAdminMail;
