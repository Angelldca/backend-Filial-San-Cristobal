import { Request, Response } from "express";
import {validationResult} from "express-validator";


const validarcampos = (req: Request,res: Response,next:()=> void)=>{
    const errors = validationResult(req);
    if( !errors.isEmpty()){
       return res.status(400).json(errors);
    }
    next();
}


export default validarcampos;