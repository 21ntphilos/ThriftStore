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
exports.emailBody = exports.Mail = exports.transporter = exports.SendOtp = void 0;
const config_1 = require("../config/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const SendOtp = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = require('twilio')(config_1.accountSid, config_1.authToken);
        const response = client.messages
            .create({
            body: `your OTP is ${otp}`,
            to: toPhoneNumber,
            // but make sure that the phone number has the country code 
            from: config_1.fromAdminPhone // the number sending the msg. ie the number twilio have given us
        });
        return response;
    }
    catch (error) {
        console.log(`${error} in onRequestOTP`);
    }
});
exports.SendOtp = SendOtp;
exports.transporter = nodemailer_1.default.createTransport({
    host: "gmail",
    auth: {
        user: config_1.GMAIL_USER,
        pass: config_1.GMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});
const Mail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield exports.transporter.sendMail({
            from: config_1.fromAdminMail,
            to,
            subject: config_1.UserSubject,
            html
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Mail = Mail;
const emailBody = (otp) => {
    const body = `<div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding: 50px 20px; margin:auto;" >
        <h2 style="text-transform: uppercase; text-align:center; color:teal;">
             <p>
                    WELCOME TO THRIFT STORES
             </p>
             <p> Hi dear your OTP is ${otp}.
             it will expire in 30 min</p>
         </h2>
    
    </div>
    
    `;
    return body;
};
exports.emailBody = emailBody;
