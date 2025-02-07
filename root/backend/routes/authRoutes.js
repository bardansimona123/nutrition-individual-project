import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout); // Adaugă endpoint-ul de logout

export default router;

