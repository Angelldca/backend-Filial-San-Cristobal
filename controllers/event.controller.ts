import { Request, Response } from "express-serve-static-core";
import { sendEmail } from "../helpers/nodemailer";
import { ReqquestUser } from "../middlewares/validarJwt";
import Eventos from "../models/evento";
import { getUsuarios } from "./usuario.controller";
import Usuarios from "../models/usuario.model";

export const getEvent = async (req:Request, res:Response)=>{
       
      const eventos =  await Eventos.find({estado:true}).sort('fecha_inicio');
      const cantEventos =  await Eventos.count();
      if(!eventos){
          res.json("no existe ningun evento en la data base");
      }
       res.json({
           msg: "get Ready obtener todos los evnetos",
           cantEventos,
           eventos
       });
}

export const postEvent = async (req:ReqquestUser, res:Response)=>{
    const {fecha_inicio, fecha_fin, ...event } = req.body;
    const {usuario} = req;
    /////////////////guardar fech
    
	const fechaInicio = new Date(Date.parse(fecha_inicio));
    const fechaFin = new Date(Date.parse(fecha_fin));
   console.log(fechaInicio,"      ",fechaFin);
    //////////
    //optimizar esto
    if(usuario.rol !== "ADMIN_ROLE"){
        res.json({
            msg: "Usuario no autorizado para crear un nuevo evento",
            usuario
        })
       }
       const data = {
        fecha_inicio, 
        fecha_fin,
         ...event
       }
    const evento = new Eventos(data);
        await evento.save();
        ///obtener correos
        const usuarios = await Usuarios.find()
        const correos: string[] = [];
    if (!usuarios) {
        res.json("no existe ningun evento en la data base");
    }
    await usuarios.map((usuario,i)=>{
       correos[i] = usuario.email;
    })
        ///fin obtener correos
        sendEmail(correos);
    res.json({
        msg: "post: Crear evento",
        evento,
        usuario
    })
}
export const putEvent = async (req:ReqquestUser, res:Response)=>{
    const id = req.params.id;
    const { ...event } = req.body;
  // const {token } = req.headers
   const {usuario} = req
   // validar token -> devuleve un usuario
  // validarJwt(req,res);
   // validar rol del usuario "ADMIN-ROLE"
   if(usuario.rol === "ADMIN_ROLE"){
    const evento = await Eventos.findByIdAndUpdate(id,event);
    if(!evento){
        res.json({
            msg: `El evento con el id: ${id} no existe en la base de datos`,
           
            
           
        })
    }
    res.json({
        msg: "put: evento actualizado",
        evento,
        usuario
    })
   }
   res.status(401).json({
    msg: "Usuario no autorizado para modificar el evento",
    
})
    
}

export const deleteEvent = async (req:Request, res:Response)=>{
    const eventos =  await Eventos.findByIdAndUpdate(req.params.id,{estado: false});
    res.json({
        msg: "delete: borrar evento",
        eventos
    })
}