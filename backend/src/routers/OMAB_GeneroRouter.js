import express from 'express'
import { omab_getGenero, omab_postGenero } from '../controllers/OMAB_GeneroController.js'
const routerGenero = express.Router()
routerGenero.get('/genero', omab_getGenero)
routerGenero.post('/genero', omab_postGenero)
export default routerGenero