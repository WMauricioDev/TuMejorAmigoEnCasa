import express from 'express'
import { omab_getUsuarios, omab_deleteUsuarios, omab_postUsuarios, omab_putUsuarios } from '../controllers/OMAB_usuarioController.js'
const omab_routerUsuario = express.Router()
omab_routerUsuario.get('/omab_usuario', omab_getUsuarios)
omab_routerUsuario.post('/omab_usuario', omab_postUsuarios)
omab_routerUsuario.put('/omab_usuario/:id', omab_putUsuarios)
omab_routerUsuario.delete('/omab_usuario/:id', omab_deleteUsuarios)

export default omab_routerUsuario