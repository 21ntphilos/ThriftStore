import {Request,Response,NextFunction}from 'express'
import { Jwt, JwtPayload} from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid' 
import { fromAdminMail, UserSubject } from '../config/config';
import { UserAttribute, UserInstance } from '../model/UserModel';
import { emailBody, Mail, SendOtp } from '../utilities/Alerts';
import { GenerateOTP, GeneratePassword, GenerateSalt, GenerateSignature, 
        loginSchema, option, registerSchema, verify } from '../utilities/utils';
import bcrypt from 'bcrypt'

/** ======================================== User Register =========================================== **/
export const Register = async (req:Request,res:Response, next:NextFunction ) => {
    try {
        const{email,phone,password,confirm_password,firstName,lastName} = req.body
        const uuiduser = uuidv4()
        
        const validateResult = registerSchema.validate(req.body,option)
        if (validateResult.error){
            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }
        const salt = await GenerateSalt()
        const userPassword = await GeneratePassword (password, salt)
        console.log("william")

            const {otp, expiry} = await GenerateOTP();

            const User = await UserInstance.findOne({where:{email: email}}) as unknown as UserAttribute

            if (!User) {
                 await UserInstance.create({
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
                    isSuspended:false
            })

            const newUser = await UserInstance.findOne({where:{email: email}}) as unknown as UserAttribute
            
            // send otp
            await SendOtp(otp,phone)

            //sent mail
            // const html = await emailBody(otp)
            // await Mail(fromAdminMail,email,UserSubject,html)

            const Signature = await GenerateSignature({
                id: newUser.id,
                email: newUser.email,
                isSuspended:newUser.isSuspended
            })
            return res.status(201).json({
                message: "User created successfully",
                Signature,
                otp,
            })

            }
            return res.status(400).json({
                message: "User already exist"
            })


    }catch (err) {
        console.log(err)
        res.status(500).json({
            Error: "Internal server error"
        })
    }
};

/** ======================================== Verify User =========================================== **/
export const VerifyUser = async(req:JwtPayload, res:Response)=>{
    try {
        const signature = req.params.signature
        const {id} = await verify(signature) as JwtPayload 
         
        const User = await UserInstance.findOne({ where: { id: id } }) as unknown as UserAttribute;      
        
        if (User) {
            const { otp } = req.body
            if (User.otp === parseInt(otp) && User.otp_expiry >= new Date()) {
                
                // validating user input
                const updatedUser = await UserInstance.update(
                    { 
                    verified: true
                 }, { where: { id: id} 
                }) as unknown as UserAttribute
               
                const newSignature = await GenerateSignature({
                    // the frontend guy stores the token and in the cookie or local storage
                    id: updatedUser.id,
                    email: updatedUser.email,
                    isSuspended:updatedUser.isSuspended
                })
                console.log(updatedUser.verified)
                if(updatedUser){
                    
                    const user = await UserInstance.findOne({ where: { id : id} }) as unknown as UserAttribute

                    res.status(200).json({
                    meessage: "Your Account has been Successfully verified",
                    Signature: newSignature,
                    verified: user.verified
                    // for you to send a response you have to findone again and use the response else you cannot 
                })
            }
            return res.status(400).json({
                message: "User Does not exist"
             })
            }
        return res.status(400).json({
            message: "Invalid credential or OTP expired"
        })
        
    }
} catch (error) {
    res.status(500).json({
        Error: "Internal Server Error", // error to display when the error occures
        route: "/user/verify" // optional 
    })
}
}

/** ==================================== USer Login ====================================== **/ 
export const login = async(req:Request, res:Response)=>{
    try {
        const {email, password} = req.body

        const validateResult = loginSchema.validate(req.body)
        if(validateResult.error){
            //console.log(validateResult.error)
            return res.status(400).json({
                Error: validateResult.error.details[0].message
    
            })
        }

        const User = await UserInstance.findOne({where: {email: email}}) as unknown as UserAttribute

        if(User.isSuspended === false){

            const validation = await bcrypt.compare(password, User.password)

            if(validation){
                const signature = await GenerateSignature({
                    id: User.id,
                    email: User.email,
                    isSuspended: User.isSuspended
                })

                return res.status(200).json({
                    message: "You have successfully logged in",
                    signature,
                    email: User.email,
                    phone: User.phone
                })
            }
            return res.status(400).json({
                message: "Wrong Username or Password"
            })
        }
        return res.status(400).json({
            message: "Your Account is Currently Suspended"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            Error: "Internal Server error",
            route: "user/login"
        })
    }
}





