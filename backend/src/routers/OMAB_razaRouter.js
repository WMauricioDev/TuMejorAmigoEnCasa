import express from 'express'
import { omab_getRaza, omab_postRaza, omab_delteRaza, omab_putRaza} from '../controllers/OMAB_RazaController.js';

const routerRaza = express.Router()

routerRaza.get('/raza', omab_getRaza)
routerRaza.post('/raza', omab_postRaza)
routerRaza.put('/raza/:id', omab_putRaza)
routerRaza.delete('/raza/:id', omab_delteRaza)

export default routerRaza