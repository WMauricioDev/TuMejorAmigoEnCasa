import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import routerRaza from './routers/OMAB_razaRouter.js';
import routerCategoria from './routers/OMAB_CategoriaRouter.js';
import routerMascota from './routers/OMAB_MascotaRouter.js';
import routerUsuario from './routers/OMAB_usuarioRouter.js';
import routerGenero from './routers/OMAB_GeneroRouter.js';
import router from './routers/OMAB_authRouter.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routerGenero)
app.use('/',routerRaza)
app.use('/', routerCategoria)
app.use('/', routerMascota)
app.use('/', routerUsuario)
app.use('/', router)


app.listen(3000, '0.0.0.0', () => console.log('Servidor corriendo en 0.0.0.0:3000'));
