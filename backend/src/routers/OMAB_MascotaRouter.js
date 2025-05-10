import express from 'express'
import { omab_getMascota, omab_deleteMascota, omab_postMascota, omab_putMascota } from '../controllers/OMAB_MascotaController.js'
import { upload } from '../middleware/omab_upload.js'
const routerMascota = express.Router()
routerMascota.get('/mascota', omab_getMascota)
routerMascota.post('/mascota', omab_postMascota)
routerMascota.put('/mascota/:id', omab_putMascota)
routerMascota.delete('/mascota/:id', omab_deleteMascota)
routerMascota.post('/mascota', upload.single('foto'), omab_postMascota);


export default routerMascota