import express from 'express';
import {} from '../Controllers/MessageCTRL.js';
import { auth, isAdmin } from '../Middlewares/Auth.js'
const router = express.Router();


export default router