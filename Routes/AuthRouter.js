import express from 'express';

import {
    SignIn, ResetPassword, RefreshToken, activateEmail, Request2OTPActivate,
    LogOut, GenerateOtp, VerifyOtp, CreateResetSession,
} from "../Controllers/AuthCTRL.js";

import { auth, authorizeRoles, LocalVariable, CheckUser } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/signin', LocalVariable, SignIn);
router.get('/refresh', RefreshToken);
router.post("/logout", auth, LogOut);
router.post('/resetpassword:', ResetPassword);


router.get('/generateOtp', CheckUser, LocalVariable, GenerateOtp);
router.get('/verifyOtp', CheckUser, VerifyOtp);
router.get('/createResetSession', CreateResetSession);
router.put('/resetpassword', ResetPassword);
router.put('/request2otpactivate', CheckUser, LocalVariable, Request2OTPActivate);
router.put('/activateEmail', activateEmail);


export default router