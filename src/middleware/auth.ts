import express,{Request, Response, NextFunction } from 'express'
import jwt,{JwtPayload } from "jsonwebtoken";
import { APP_SECRET } from "../config/config";
import { UserAttribute, UserInstance } from '../model/UserModel';

export const auth = async(req: JwtPayload, res:Response, next:NextFunction) => {
    try { const authorization = req.headers.authorization
      if(!authorization) {
          return res.status(401).json({
              Error: "Kindly signin as a user"
          })
      }
  
      const token = authorization.slice(7, authorization.length)
      let verified = jwt.verify(token, APP_SECRET)
  
  if(!verified) {
      return res.status(401).json({
          Error: "unauthorised"
      })
  }
  
  const {id} = verified as {[key:string]:string}
  
  //find user by id
  const user = (await UserInstance.findOne({
      where: { id : id },
    })) as unknown as UserAttribute;
  
    if(!user)  {
      return res.status(401).json({
          Error: "Invalid Credentials or User not found"
      })
    }
  
  req.user = verified as {[key:string]:string}
  next()
  
  } catch (err) {
      return res.status(401).json({
          Error: "Unauthorized"
      })
  }
  };
  