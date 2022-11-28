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
exports.verify = exports.GenerateSignature = exports.GenerateOTP = exports.GeneratePassword = exports.GenerateSalt = exports.option = exports.adminSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
// import {APP_SECRET} from "../config"
// import { AuthPayload } from '../interface'
exports.registerSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}$")),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("confirm password")
        .messages({
        "any.only": "{{#label}} does not match",
    }),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
});
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
});
exports.adminSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().regex(/[a-zA-Z0-9]{3,30}/),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt();
});
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.GeneratePassword = GeneratePassword;
const GenerateOTP = () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 100));
    return { otp, expiry };
});
exports.GenerateOTP = GenerateOTP;
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, config_1.APP_SECRET, { expiresIn: '1d' });
});
exports.GenerateSignature = GenerateSignature;
function verify(signature) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jsonwebtoken_1.default.verify(signature, config_1.APP_SECRET);
    });
}
exports.verify = verify;
