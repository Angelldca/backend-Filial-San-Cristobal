import { ObjectId } from "mongoose";
import Evento from "../models/evento";
import Usuario from '../models/usuario.model';

export const existeEventoPorId = async (id:ObjectId)=>{
    const existeEventos =  await Evento.findById(id);
    if( !existeEventos){
        throw new Error(`El id: ${id} no existe`);
    }
    
}
export const existeUsuarioPorId = async (id:ObjectId)=>{
    const existeEventos =  await Usuario.findById(id);
    if( !existeEventos){
        throw new Error(`El id: ${id} no existe`);
    }
    
}



export const validarurl =  async (url:string)=>{
    const urlSeparada =  await url.split(".");
   // const https = urlSeparada [0]
   let https:string = ''; 
        for(let i =0; i < 8; i++){
           https += urlSeparada[0].charAt(i);
        }
        
        if(https === "https://" && urlSeparada[urlSeparada.length-1] === "com"){
            if(urlSeparada[1]!== "com" && urlSeparada[urlSeparada.length-2] !== https){
                
                
               
                return true;
            }else{return false}
        }
        else{
            return false
        }
        
    
    //console.log(urlSeparada);
 }

 export const uniqueEmail = async(email:string)=>{
        const correo = await Usuario.findOne({email});
  if(correo){
    throw new Error(`El correo: ${email} ya existe`);
  }
              
 }