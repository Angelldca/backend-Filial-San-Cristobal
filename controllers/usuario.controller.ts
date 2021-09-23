import { Request, Response } from "express-serve-static-core";
import { generarjwt } from "../helpers/generarJwt";
import axios from "axios";
import bcrypt from "bcrypt";
import Usuarios from "../models/usuario.model";
import { ReqquestUser } from "../middlewares/validarJwt";
axios.defaults;

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuarios.find()
    const cantUsuarios = await Usuarios.countDocuments();
    const correos: string[] = [];
    if (!usuarios) {
        res.json("no existe ningun evento en la data base");
    }
    await usuarios.map((usuario,i)=>{
       correos[i] = usuario.email;
    })
    res.json({
        msg: "get Ready obtener todos los Usuarios y la cantidad",
        cantUsuarios,
        usuarios,
        emails:correos
        
    });
}
//autenticar usuario 
export const postAuth = async (req: Request, res: Response) => {

    const { email, password } = req.body;


    try {
        //verificar si el email existe
        const usuario = await Usuarios.findOne({email})
        .select('password')
        .select('estado')
        .select('email')
        .select('nombre')
        .select('rol')
       
        if (!usuario) {
            
            return res.status(400).json({
                msg: "El correo no existe en la data base"
            });
        }
        //Si el usuario esta activo

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "usuario no activo"
            })
        }
        const validPassword = await bcrypt.compareSync(password,usuario.password)
    
        if(!validPassword){
            return res.json({
                 msg:"password incorrecta"
             })
         }
       
       const token = await generarjwt(usuario.id);

        res.json({usuario, token});

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Hable con el admin"
        });
    }
 

}

const permitirUser = async (req: Request,res: Response, nombre:string,email:string)=>{
    let usuario = await Usuarios.findOne({email});
    if(!usuario){
        const data ={
            nombre,
            email,
            password: ':P',
            google:true,


        }
        usuario = new Usuarios(data);
        await usuario.save()
     
    }

    if(!usuario.estado){
     res.status(401).json({
         msg:"usuario no autorizado",
       
    });
    }
    
       //generar un jwt
       const token = await generarjwt(usuario.id);
      res.json({
          msg:"token valido",
          usuario,
         token
     })
}

export const postAuthGoogle = async (req: Request, res: Response) => {

    const { id_token} = await req.body;

    await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`)
    // .then(resp => resp.json() )
     .then( async data => {
         let correo = await data.data.email;
         let nombre = await data.data.name;
        
         console.log("token valido ", nombre, correo)
         
     permitirUser(req,res,nombre,correo);
     
     });

}
//suscribir usuario
export const postUsuario = async (req: Request, res: Response) => {
    
    const { nombre,
        email,
        password } = req.body;
      
    let usuario = new Usuarios({
        nombre,
        email,
        password
    })
    const salt = bcrypt.genSaltSync();
    usuario.password = await bcrypt.hashSync(password, salt)
    await usuario.save();

    res.json({
        msg: "post: Usuario creado",
        usuario
    })
}

export const deleteUsuarios = async (req: Request, res: Response) => {
    const id = req.params.id;
    const usuario = await Usuarios.findByIdAndUpdate(id, { estado: false });

    if (!usuario) {
        res.json(`no existe ningun usuario con el id: ${id}`);
    }

    res.json({
        msg: "Usuario eliminado, estado false",
        usuario
    });
}


export const renovarToken = async(req:ReqquestUser,res:Response)=>{
    const {usuario} = req;
    const token = await generarjwt(usuario.id);
    
  
  res.json({
        usuario,
        token
    })
   
}

