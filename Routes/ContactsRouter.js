import express from 'express';
import {
    newContact,GetContacts
} from '../Controllers/ContactsCTRL.js';
import { auth } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/', auth, newContact);
router.get('/', auth, GetContacts);



export default router