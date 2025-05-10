import express from 'express'
import { omab_getCategoria, omab_deleteCategoria, omab_postCategoria, omab_putCategoria } from '../controllers/OMAB_CategoriaController.js'
const routerCategoria = express.Router()
routerCategoria.get('/categoria', omab_getCategoria)
routerCategoria.post('/categoria', omab_postCategoria)
routerCategoria.put('/categoria/:id', omab_putCategoria)
routerCategoria.delete('/categoria/:id', omab_deleteCategoria)

export default routerCategoria
