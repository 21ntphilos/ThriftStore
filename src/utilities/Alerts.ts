import { accountSid, authToken, fromAdminMail, fromAdminPhone, GMAIL_PASS, GMAIL_USER, UserSubject } from "../config/config";
import nodemailer from 'nodemailer'



export const SendOtp = async(otp:number, toPhoneNumber: string) =>{
    try {
        const client = require('twilio')(accountSid, authToken);
        const response = client.messages
            .create({
                body: `your OTP is ${otp}`, // the  msg to be sent to your client 
                to: toPhoneNumber,// leave the country code for the frontend to do that else you would be sending to one country eg Nigeria
                // but make sure that the phone number has the country code 
                from: fromAdminPhone// the number sending the msg. ie the number twilio have given us
            })
            return response
    } catch (error) {
        console.log(`${error} in onRequestOTP`)
    }

}




export const transporter = nodemailer.createTransport({
    host: "gmail",

    auth: {
      user:GMAIL_USER,  
      pass:GMAIL_PASS
    },
    tls:{
        rejectUnauthorized:false
        }
    
});

export const Mail = async(from: string, to: string, subject: string, html: string)=>{

    try {
       return await transporter.sendMail({
            from: fromAdminMail,
            to,
            subject: UserSubject,
            html
        })
        
    } catch (error) {
        console.log(error)
    }

}
export const emailBody =(otp:number):any  => {
    const body = `<div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding: 50px 20px; margin:auto;" >
        <h2 style="text-transform: uppercase; text-align:center; color:teal;">
             <p>
                    WELCOME TO THRIFT STORES
             </p>
             <p> Hi dear your OTP is ${otp}.
             it will expire in 30 min</p>
         </h2>
    
    </div>
    
    `
    return body
}