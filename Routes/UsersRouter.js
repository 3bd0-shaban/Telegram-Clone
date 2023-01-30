import express from 'express';
import {
    AllUsers, Delete_UserInfo, ForgotPassword, Get_UserInfo, LogOut, RefreshToken,
    ResetPassword, SignIn, SignUp, Update_UserInfo, UserInfo
} from '../Controllers/UserCTRL.js';
import { auth, isAdmin } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/info', auth, UserInfo);
router.get('/userinfo', RefreshToken, UserInfo);
router.get('/refresh', RefreshToken);
router.get('/get/:id', auth, Get_UserInfo);
router.delete('/deleteuser/:id', auth, Delete_UserInfo);
router.put('/updateuser/:id', auth, Update_UserInfo);
router.post("/logout", auth, LogOut);
router.post('/forgot', ForgotPassword);
router.post('/resetpassword:', ResetPassword);
router.get('/users', auth, AllUsers);


export default router