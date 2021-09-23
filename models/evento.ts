import {Schema, model} from 'mongoose';

const EnventSchema = new Schema({
    nombre:{
        type:String      
    },
    descripcion:{
        type:String      
    },
    url:{
        type:String      
    },
    sede:{
        type:String      
    },
    fecha_inicio:{
        type:Date      
    },
    fecha_fin:{
        type:Date      
    },
    tematica:{
        type:String      
    },
    especialidad:{
        type:String      
    },
    tipo:{
        type:String      
    },
    modalidad:{
        type:String      
    },
    alcance:{
        type:String      
    },
    idioma:{
        type:String      
    },
    pais:{
        type:String      
    },
    creditos:{
        type:String      
    },
    nombre_contacto:{
        type:String      
    },
    correo:{
        type:String      
    },
    estado:{
        type:Boolean,
        default:true
    },
    fecha_creacion:{
         type: Date,
         default: new Date().getTime()
    }
});

export default model("Eventos",EnventSchema );
