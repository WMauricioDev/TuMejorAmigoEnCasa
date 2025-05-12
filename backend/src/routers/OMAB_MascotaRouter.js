import express from 'express'
import { omab_getMascota, omab_deleteMascota, omab_postMascota, omab_putMascota, omab_getMascotaById } from '../controllers/OMAB_MascotaController.js'
import { upload } from '../middleware/omab_upload.js'
const omab_routerMascota = express.Router()
omab_routerMascota.get('/omab_mascota', omab_getMascota)
omab_routerMascota.post('/omab_mascota', upload.single('foto'), omab_postMascota);
omab_routerMascota.put('/omab_mascota/:id', upload.single('foto'), omab_putMascota);
omab_routerMascota.delete('/omab_mascota/:id', omab_deleteMascota)
omab_routerMascota.get('/omab_mascota/:id', omab_getMascotaById);

export default omab_routerMascota