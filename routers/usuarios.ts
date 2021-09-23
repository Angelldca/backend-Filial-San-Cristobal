import express from "express";
import { deleteEvent, getEvent, postEvent, putEvent } from "../controllers/event.controller";
import {check} from "express-validator";
import validarcampos from "../middlewares/validar-campos";
import { existeUsuarioPorId, uniqueEmail, validarurl } from "../helpers/db-validator";
import { deleteUsuarios, getUsuarios, postAuth, postAuthGoogle, postUsuario } from "../controllers/usuario.controller";

const router = express.Router();


router.get('/', getUsuarios);


router.post('/',[
    check("email","correo incorrecto").isEmail(),
    check("email","correo incorrecto").custom(uniqueEmail),
    validarcampos
], postUsuario);

router.post('/login',[
    check("email","correo incorrecto").isEmail(),
   // check("email","correo incorrecto").custom(uniqueEmail),
   check("password","la contraseña es obligatoria").not().isEmpty(),
    validarcampos
], postAuth);


router.post('/login/google',[
    check('id_token',"El token es obligatorio").not().isEmpty(),
    validarcampos
], postAuthGoogle);


router.delete('/:id',[
    check("id","id incorrecto, no es un id de MongoDb").isMongoId(),
    check("id","id no existe").custom(existeUsuarioPorId),
    validarcampos
], deleteUsuarios);


export default router;