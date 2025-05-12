import { Router } from 'express';
import { omab_obtenerMascotasDisponibles, omab_obtenerCantidadPorCategoria } from '../controllers/OMAB_Reporte.js';

const omab_routerReporte = Router();

omab_routerReporte.get('/mascotas-disponibles', omab_obtenerMascotasDisponibles);
omab_routerReporte.get('/reportePorCategoria', omab_obtenerCantidadPorCategoria);

export default omab_routerReporte;
