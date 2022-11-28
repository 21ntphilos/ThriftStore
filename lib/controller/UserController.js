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
exports.login = exports.VerifyUser = exports.Register = void 0;
const uuid_1 = require("uuid");
const UserModel_1 = require("../model/UserModel");
const Alerts_1 = require("../utilities/Alerts");
const utils_1 = require("../utilities/utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
/** ======================================== User Register =========================================== **/
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone, password, confirm_password, firstName, lastName } = req.body;
        const uuiduser = (0, uuid_1.v4)();
        const validateResult = utils_1.registerSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const salt = yield (0, utils_1.GenerateSalt)();
        const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
        console.log("william");
        const { otp, expiry } = yield (0, utils_1.GenerateOTP)();
        const User = yield UserModel_1.UserInstance.findOne({ where: { email: email } });
        if (!User) {
            yield UserModel_1.UserInstance.create({
                id: uuiduser,
                email,
                password: userPassword,
                firstName,
                lastName,
                salt,
                address: '',
                phone,
                otp,
                otp_expiry: expiry,
                verified: false,
                role: 'user',
                isSuspended: false
            });
            const newUser = yield UserModel_1.UserInstance.findOne({ where: { email: email } });
            // send otp
            yield (0, Alerts_1.SendOtp)(otp, phone);
            //sent mail
            // const html = await emailBody(otp)
            // await Mail(fromAdminMail,email,UserSubject,html)
            const Signature = yield (0, utils_1.GenerateSignature)({
                id: newUser.id,
                email: newUser.email,
                isSuspended: newUser.isSuspended
            });
            return res.status(201).json({
                message: "User created successfully",
                Signature,
                otp,
            });
        }
        return res.status(400).json({
            message: "User already exist"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            Error: "Internal server error"
        });
    }
});
exports.Register = Register;
/** ======================================== Verify User =========================================== **/
const VerifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signature = req.params.signature;
        const { id } = yield (0, utils_1.verify)(signature);
        const User = yield UserModel_1.UserInstance.findOne({ where: { id: id } });
        if (User) {
            const { otp } = req.body;
            if (User.otp === parseInt(otp) && User.otp_expiry >= new Date()) {
                // validating user input
                const updatedUser = yield UserModel_1.UserInstance.update({
                    verified: true
                }, { where: { id: id }
                });
                const newSignature = yield (0, utils_1.GenerateSignature)({
                    // the frontend guy stores the token and in the cookie or local storage
                    id: updatedUser.id,
                    email: updatedUser.email,
                    isSuspended: updatedUser.isSuspended
                });
                console.log(updatedUser.verified);
                if (updatedUser) {
                    const user = yield UserModel_1.UserInstance.findOne({ where: { id: id } });
                    res.status(200).json({
                        meessage: "Your Account has been Successfully verified",
                        Signature: newSignature,
                        verified: user.verified
                        // for you to send a response you have to findone again and use the response else you cannot 
                    });
                }
                return res.status(400).json({
                    message: "User Does not exist"
                });
            }
            return res.status(400).json({
                message: "Invalid credential or OTP expired"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/user/verify" // optional 
        });
    }
});
exports.VerifyUser = VerifyUser;
/** ==================================== USer Login ====================================== **/
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validateResult = utils_1.loginSchema.validate(req.body);
        if (validateResult.error) {
            //console.log(validateResult.error)
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const User = yield UserModel_1.UserInstance.findOne({ where: { email: email } });
        if (User.isSuspended === false) {
            const validation = yield bcrypt_1.default.compare(password, User.password);
            if (validation) {
                const signature = yield (0, utils_1.GenerateSignature)({
                    id: User.id,
                    email: User.email,
                    isSuspended: User.isSuspended
                });
                return res.status(200).json({
                    message: "You have successfully logged in",
                    signature,
                    email: User.email,
                    phone: User.phone
                });
            }
            return res.status(400).json({
                message: "Wrong Username or Password"
            });
        }
        return res.status(400).json({
            message: "Your Account is Currently Suspended"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            Error: "Internal Server error",
            route: "user/login"
        });
    }
});
exports.login = login;
