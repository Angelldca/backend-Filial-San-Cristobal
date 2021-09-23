import express, { Request, Response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import evento from "../routers/eventos";
import usuario from "../routers/usuarios";
import dbConnections from "../db/config";
import path from "path";

dotenv.config();

class Server {
     private port = process.env.PORT;
    private app: express.Application;
    private path:string;
    constructor(){
           this.app = express();
            this.path =__dirname;
           this.middelwere();
           this.routers();
           this.conectarDb();
    }
          routers(){
              this.app.use('/evento', evento);
              this.app.use('/usuario', usuario);
              this.app.get('*',(req:Request,res: Response)=>{
                 
                  //console.log( path.join(__dirname,'../public/index.html'));
                  const imgPath = path.join(__dirname,'../public/index.html');
                 
                   res.sendFile(imgPath);
              })
          }
       middelwere(){
           this.app.use(cors());
           this.app.use(express.json());
           this.app.use(express.urlencoded({extended:true}))
           this.app.use(express.static('public'));
       }
       async conectarDb(){
       
        await dbConnections()
 }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("server run in the port:",this.port);
        })
    }
}

export default Server;