import express from 'express'
import { omab_getCategoria, omab_deleteCategoria, omab_postCategoria, omab_putCategoria } from '../controllers/OMAB_CategoriaController.js'
const omab_routerCategoria = express.Router()
omab_routerCategoria.get('/omab_categoria', omab_getCategoria)
omab_routerCategoria.post('/omab_categoria', omab_postCategoria)
omab_routerCategoria.put('/omab_categoria/:id', omab_putCategoria)
omab_routerCategoria.delete('/omab_categoria/:id', omab_deleteCategoria)

export default omab_routerCategoria
