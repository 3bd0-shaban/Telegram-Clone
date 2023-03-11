import express from 'express';

import {
    SignIn, RefreshToken, activateEmail, RequestActivate,
    LogOut,
} from "../Controllers/AuthCTRL.js";

import { auth, authorizeRoles, LocalVariable, CheckUser } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/signin', LocalVariable, SignIn);
router.get('/refresh', RefreshToken);
router.post("/logout", auth, LogOut);


router.put('/request-activate', CheckUser, LocalVariable, RequestActivate);
router.put('/activateEmail', activateEmail);


export default router