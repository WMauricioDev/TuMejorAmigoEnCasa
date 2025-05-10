import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import omab_prisma from '../config/prisma.js';

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await omab_prisma.usuarios.findFirst({ where: { email } });

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
