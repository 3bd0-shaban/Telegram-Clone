import express from 'express';
import { auth } from '../Middlewares/Auth.js'
import { NewChannel } from './../Controllers/ChannelCTRL.js';
const router = express.Router();

router.post('/', auth, NewChannel)
export default router