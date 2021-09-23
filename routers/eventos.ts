

import express from "express";
import { deleteEvent, getEvent, postEvent, putEvent } from "../controllers/event.controller";
import {check} from "express-validator";
import validarcampos from "../middlewares/validar-campos";
import { existeEventoPorId, validarurl } from "../helpers/db-validator";
import { validarJwt } from "../middlewares/validarJwt";
import { renovarToken } from "../controllers/usuario.controller";

const router = express.Router();


router.get('/', getEvent);
router.post('/',[
    check("correo","correo incorrecto").isEmail(),
    check("url","URL no valida").custom(validarurl),
    validarJwt,
    validarcampos
], postEvent);
router.put('/:id',[
    check('id', "no es una ID valido").isMongoId(),
    check('id',"el evento con ese id no existe").custom(existeEventoPorId),
    validarJwt,
    validarcampos
], putEvent);
router.delete('/:id', [
    // validarJwt, //TODO
   //  esAdminRole,  //TODO
    check('id', "no es una ID valido").isMongoId(),

    check('id',"el evento con ese id no existe").custom(existeEventoPorId),
    validarcampos
],deleteEvent);


export default router;