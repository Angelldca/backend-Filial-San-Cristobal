import jwt from "jsonwebtoken";

import Usuario from "../models/usuario.model";




export const generarjwt = (uid:string)=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};
        const key: string =  process.env.PRIVATE_KEY ;
        

         jwt.sign(payload, key,{
            expiresIn: '4h'
         },(err,token)=>{
             if(err){
                 return reject(err);
             }
             else{
                 return resolve(token)
             }
         });
    })
}


export const comprobarJWt = async(token:string) => {
    interface Userpayload{
        uid:string
    }
    const key: string =  process.env.PRIVATE_KEY ;
    try {
        if (token.length < 10)
            return null;
       const {uid} = jwt.verify(token, key) as Userpayload;

       const usuario = await Usuario.findById(uid);
       if (usuario && usuario.estado)
           return usuario;
       else {
           return null;
       }
    } catch (error) {
        return null;
    }
}