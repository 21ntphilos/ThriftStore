import {Request,Response,NextFunction}from 'express'
import { Jwt, JwtPayload} from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid' 
import { fromAdminMail, UserSubject } from '../config/config';
import { UserAttribute, UserInstance } from '../model/UserModel';
import { emailBody, Mail, SendOtp } from '../utilities/Alerts';
import { adminSchema, GenerateOTP, GeneratePassword, GenerateSalt, GenerateSignature, 
        loginSchema, option, registerSchema, verify } from '../utilities/utils';
import bcrypt from 'bcrypt'
import { propertyInstance } from '../model/propertyModel';
import { VendorInstance } from '../model/Vendor';

/**==============SUPER ADMIN REGISTRATION=============== */

export const SuperAdminRegister = async (req: JwtPayload, res: Response) => {
    try {
      const { email, phone, password, firstName, lastName, address } = req.body;
      //to create user Id from uuid
      const uuidAdmin = uuidv4();
      const validateResult = adminSchema.validate(req.body, option);
      if (validateResult.error) {
        return res.status(400).json({
          Error: validateResult.error.details[0].message,
        });
      }
      //generate salt
      const salt = await GenerateSalt();
      //encrypt password
      const AdminPassword = await GeneratePassword(password, salt);
      //Generte OTP
      const { otp, expiry } = await GenerateOTP();
      //check if the admin exist
      const Admin = (await UserInstance.findOne({
        where: { email: email },
      })) as unknown as UserAttribute;
     
      if (!Admin) {
     
        await UserInstance.create({
          id: uuidAdmin,
          email,
          password: AdminPassword,
          firstName,
          lastName,
          salt,
          address,
          phone,
          otp,
          otp_expiry: expiry,
          verified: true,
          role: "superadmin",
          isSuspended:false
        });
        
        const Admin = (await UserInstance.findOne({
          where: { email: email },
        })) as unknown as UserAttribute; //attributes comes from the User attribute
        //generate signature
        const signature = await GenerateSignature({
          id: Admin.id,
          email: Admin.email,
          isSuspended: Admin.isSuspended
        });
        //   console.log(signature)
        // return statement on creation of user
        return res.status(201).json({
          message: "Admin created Successfull",
          signature,
          verified: Admin.verified,
        });
      }
      // return statement if user exist
      return res.status(400).json({
        message: "Admin already exist",
      });
    } catch (error) {
      res.status(500).json({
        Error: "Internal Server Error",
        route: "/admin/create-superadmin",
      });
    }
  };

  /**  ============================================== Create Admin ==================================== **/

  export const AdminRegister = async (req: JwtPayload, res: Response) => {
    try {
      const id = req.user.id
      const { email, phone, password, firstName, lastName, address } = req.body;
      
      const uuidAdmin = uuidv4();
      const validateResult = adminSchema.validate(req.body, option);
      if (validateResult.error) {
        return res.status(400).json({
          Error: validateResult.error.details[0].message,
        });
      }
      //generate salt
      const salt = await GenerateSalt();
      //encrypt password
      const userPassword = await GeneratePassword(password, salt);
      //Generte OTP
      const { otp, expiry } = await GenerateOTP();
      //check if the admin exist
      const Admin = (await UserInstance.findOne({
        where: { email: email },
      })) as unknown as UserAttribute;
      //create admin if not existing
  
      if (!Admin) {
        const superadmin = (await UserInstance.findOne({
          where: { id: id },
        })) as unknown as UserAttribute;
  
        if (superadmin.role === "superadmin") {
          //.role  === "superadmin")
          //to create admin u must add all the model properties
          await UserInstance.create({
            id: uuidAdmin, // user id created from uuidv4
            email,
            password: userPassword, //we set the password to user password that has been hashed
            firstName,
            lastName,
            salt,
            address,
            phone,
            otp,
            otp_expiry: expiry,
            verified: true,
            role: "admin",
            isSuspended: false
          });
          
          const Admin = (await UserInstance.findOne({
            where: { email: email },
          })) as unknown as UserAttribute; //attributes comes from the User attribute
          //generate signature
          const signature = await GenerateSignature({
            id: Admin.id,
            email: Admin.email,
            isSuspended: Admin.isSuspended
          });
          //   console.log(signature)
          // return statement on creation of user
          return res.status(201).json({
            message: "Admin Created Successfull",
            signature,
            verified: Admin.verified,
          });
        }
        return res.status(400).json({
          message: "Unauthorised",
        });
      }
      // return statement if user exist
      return res.status(400).json({
        message: "Admin Already Exist",
      });
    } catch (error) {
      res.status(500).json({
        Error: "Internal Server Error",
        route: "/admin/CreateAdmin",
      });
    }
  };
  //********************* */ get all Users  *************************************/
  export const getAllUsers = async (req: JwtPayload, res: Response) => {
    try {
      const { id } = req.user;
  
      const admin = (await UserInstance.findOne({
        where: { id: id },
      })) as unknown as UserAttribute;
  
      if (admin) {
        const limit = req.query.limit as number | undefined;
        const users = await UserInstance.findAndCountAll({
          limit: limit,
        });
        return res.status(200).json({
          message: "you have succesfully retireved all users",
          count: users.count,
          Users: users.rows,
        });
      }
      return res.status(200).json({
        message: "unauthorised",
      });
    } catch (err) {
      return res.status(500).json({
        Error: "internal server error",
        Route: "/admin/get-all-users",
      });
    }
  };
  
  export const getAllVendors = async (req: JwtPayload, res: Response) => {
    try {
      const { id } = req.user;
  
      const admin = (await UserInstance.findOne({
        where: { id: id },
      })) as unknown as UserAttribute;
  
      if (admin) {
        const limit = req.query.limit as number | undefined;
        const vendors = await VendorInstance.findAndCountAll({
          limit: limit,
        });
        return res.status(200).json({
          message: "you have succesfully retireved all vendors",
          count: vendors.count,
          Vendors: vendors.rows,
        });
      }
      return res.status(200).json({
        message: "unauthorised",
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        Error: "internal server error",
        Route: "/admin/get-all-vendors",
      });
    }
  };
  
  export const getAllProperties = async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit as number | undefined;
      const property = await propertyInstance.findAndCountAll({
        limit: limit,
      });
      return res.status(200).json({
        message: "you have succesfully retireved all vendors",
        count: property.count,
        Vendors: property.rows,
      });
    } catch (err) {
      return res.status(500).json({
        Error: "internal server error",
        Route: "/admin/get-all-vendors",
      });
    }
  };