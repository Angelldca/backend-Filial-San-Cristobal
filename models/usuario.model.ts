import { Schema, model, Model, Mongoose, ObjectId} from "mongoose";

export interface IUser{
    nombre:string;
    email:string;
    password:string;
    rol:string;
    estado:string;
    google:string;
   uid:string;
};
interface UserModel extends Model<IUser>{
    nombre:string;
    email:string;
    password:string;
    rol:string;
    estado:string;
    google:string;
    _id:string;
    __v:any;
    uid: string;
    findByIdAndUpdate(a:string,b:object):any;
    
}

const Usuarioschema = new Schema<IUser, UserModel>({
    nombre:{
        type:String,
        require:[true, 'El nombre de usuario es obligatorio'],

    },
    email:{
        type:String,
        require:[true, 'El correo es obligatorio'],
        //unique:true
    },
    password:{
        type:String,
        select: false,
        require:[true, 'El password es obligatorio']
    },
    rol:{
        type:String,
        required: true,
        enum:['USER_ROLE','ADMIN_ROLE'],
        default:"USER_ROLE"
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
    
})

 



Usuarioschema.set('toJSON', {
    transform: function(doc, ret, opt) {
       
        delete ret['password']
        ret.uid = ret._id
        delete ret._id
        return ret 
    }});

/*

static updateById(model:Model, body, id:string, done?) {
     model.findByIdAndUpdate(id, body, done);
 }
*/

export default model<IUser, UserModel>("Usuarios",Usuarioschema);