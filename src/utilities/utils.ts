import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthPayload } from '../interface';
import { APP_SECRET } from '../config/config';
// import {APP_SECRET} from "../config"
// import { AuthPayload } from '../interface'

export const UserRegisterSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("confirm password")
        .messages({
        "any.only": "{{#label}} does not match",
        }),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
});

export const VendorRegisterSchema = Joi.object().keys({
  Name: Joi.string(),
  email: Joi.string().required(),
  Password: Joi.string().required().regex(/[A-Za-z0-9]{3,30}/),
  confirm_password: Joi.any().equal(Joi.ref('Password')).required().label('confirm password').messages({ 'any.only': '{{#label}} does not match' }),
  vendorphone: Joi.string().required()
})

export const adminSchema = Joi.object().keys({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.string().required(),
})

export const option = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };
  
  export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
  };
      
export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (inputPD: string, userPd: string)=>{
  return bcrypt.compare(inputPD,userPd)
}

export const GenerateOTP = async () => {
  const otp = Math.floor(Math.random() * 9000)
  const expiry = new Date()
  expiry.setTime(new Date().getTime() + (30 *60*100) ) 
  return {otp, expiry};
};

export const GenerateSignature = async(payload:AuthPayload)=>{
    return jwt.sign(payload,APP_SECRET,{expiresIn:'1d'});
}

export async function verify (signature:string){
  return jwt.verify(signature,APP_SECRET)
}
