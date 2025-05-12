import express from 'express'
import { omab_getGenero, omab_postGenero } from '../controllers/OMAB_GeneroController.js'
const omab_routerGenero = express.Router()
omab_routerGenero.get('/omab_genero', omab_getGenero)
omab_routerGenero.post('/omab_genero', omab_postGenero)
export default omab_routerGenero