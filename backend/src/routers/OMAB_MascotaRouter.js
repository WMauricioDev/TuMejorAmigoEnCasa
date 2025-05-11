import express from 'express'
import { omab_getMascota, omab_deleteMascota, omab_postMascota, omab_putMascota } from '../controllers/OMAB_MascotaController.js'
const omab_routerMascota = express.Router()
omab_routerMascota.get('/omab_mascota', omab_getMascota)
omab_routerMascota.post('/omab_mascota', omab_postMascota)
omab_routerMascota.put('/omab_mascota/:id', omab_putMascota)
omab_routerMascota.delete('/omab_mascota/:id', omab_deleteMascota)


export default omab_routerMascota