import express from 'express'
import { omab_getRaza, omab_postRaza, omab_delteRaza, omab_putRaza} from '../controllers/OMAB_RazaController.js';

const omab_routerRaza = express.Router()

omab_routerRaza.get('/omab_raza', omab_getRaza)
omab_routerRaza.post('/omab_raza', omab_postRaza)
omab_routerRaza.put('/omab_raza/:id', omab_putRaza)
omab_routerRaza.delete('/omab_raza/:id', omab_delteRaza)

export default omab_routerRaza