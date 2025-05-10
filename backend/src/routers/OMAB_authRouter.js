import express from 'express';
import { login } from '../controllers/OMAB_authController.js';

const router = express.Router();

router.post('/auth', login);

export default router;
