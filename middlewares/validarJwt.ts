
import  Usuarios from "../models/usuario.model";
import {IUser} from "../models/usuario.model";
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response, } from "express";

export interface ReqquestUser extends Request{
    usuario?:IUser | any;
}

export const validarJwt = async (req:ReqquestUser,res: Response,next:()=> void)=>{
    interface Userpayload{
        uid:string
    }
    const key: string =  process.env.PRIVATE_KEY ;
      const token = await req.header('x-token');
      
      if(!token){
        return res.status(401).json({
             msg:" not token"
         })
      }

      try{
        
        
       
       
        const {uid} =  jwt.verify(token, key) as Userpayload;
        
           // leer usuario uid 
           const usuario = await Usuarios.findById(uid);
          
           if(!usuario){
            return res.status(401).json({
                msg: "token no valido usuario no existe"
            })
        }
           
           if(!usuario.estado){
               return res.status(401).json({
                   msg: "token no valido usuario inactivo"
               })
           }
           req.usuario = usuario;
           
        next();
      }catch(err){
          console.log(err);
        return res.status(401).json({
            msg:" token no valido"
        })
     }
 
      }