import { Router } from 'express';
import { omab_obtenerCantidadPorCategoria, omab_obtenerMascotasDisponibles } from '../controllers/omab_grafica.js';

const omab_routerGrafica = Router();

omab_routerGrafica.get('/reportePorCategoriaGrafica', omab_obtenerCantidadPorCategoria);
omab_routerGrafica.get('/reporteMascotasDisponibleGrafica', omab_obtenerMascotasDisponibles);

export default omab_routerGrafica;
