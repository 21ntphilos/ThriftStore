"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromAdminMail = exports.UserSubject = exports.AdminPhone = exports.GMAIL_PASS = exports.GMAIL_USER = exports.fromAdminPhone = exports.authToken = exports.accountSid = exports.APP_SECRET = exports.db = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.db = new sequelize_1.Sequelize('app', '', '', {
    storage: "ThriftStores.sqlite",
    dialect: "sqlite",
    logging: false
});
exports.APP_SECRET = process.env.APP_SECRET;
exports.accountSid = process.env.ACCOUNT_SID;
exports.authToken = process.env.AUTH_TOKEN;
exports.fromAdminPhone = process.env.TWILO_PHONE;
exports.GMAIL_USER = process.env.GMAIL_USER;
exports.GMAIL_PASS = process.env.GMAIL_PASS;
exports.AdminPhone = process.env.fromAdiminPhone;
exports.UserSubject = process.env.UserSubject;
exports.fromAdminMail = process.env.FromAdminMail;
