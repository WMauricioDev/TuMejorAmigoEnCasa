import express from 'express'
import { omab_getUsuarios, omab_deleteUsuarios, omab_postUsuarios, omab_putUsuarios } from '../controllers/OMAB_usuarioController.js'
const routerUsuario = express.Router()
routerUsuario.get('/usuario', omab_getUsuarios)
routerUsuario.post('/usuario', omab_postUsuarios)
routerUsuario.put('/usuario/:id', omab_putUsuarios)
routerUsuario.delete('/usuario/:id', omab_deleteUsuarios)

export default routerUsuario