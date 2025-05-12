import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'; 
import path from 'path';
import { fileURLToPath } from 'url';

import omab_routerRaza from './routers/OMAB_razaRouter.js';
import omab_routerCategoria from './routers/OMAB_CategoriaRouter.js';
import omab_routerMascota from './routers/OMAB_MascotaRouter.js';
import omab_routerUsuario from './routers/OMAB_usuarioRouter.js';
import omab_routerGenero from './routers/OMAB_GeneroRouter.js';
import omab_routerAuth from './routers/OMAB_authRouter.js';
import omab_routerReporte from './routers/omab_ReporteRouter.js';
import omab_routerGrafica from './routers/omab_graficaRouter.js';
dotenv.config();


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.json());
app.use('/', omab_routerGenero)
app.use('/',omab_routerRaza)
app.use('/', omab_routerCategoria)
app.use('/', omab_routerMascota)
app.use('/', omab_routerUsuario)
app.use('/', omab_routerAuth)
app.use('/', omab_routerReporte)
app.use('/', omab_routerGrafica)
app.get('/documents', (req, res) => {
  res.render('documents.ejs');
});

const upload = multer({ dest: 'src/media/' }); 
app.use('/media', express.static('src/media'));


app.listen(3000, () => console.log('Servidor corriendo'));
