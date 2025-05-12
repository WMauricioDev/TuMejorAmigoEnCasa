import express from 'express';
import { login } from '../controllers/OMAB_authController.js';

const omab_RouterAuth = express.Router();

omab_RouterAuth.post('/omab_auth', login);

export default omab_RouterAuth;
