import express from 'express';
import {
    AllUsers, Delete_UserInfo, Get_UserInfo, Update_UserInfo, UserInfo, SearchUser
} from '../Controllers/UserCTRL.js';
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.get('/info', auth, UserInfo);
router.get('/userinfo', auth, UserInfo);
router.get('/search', auth, SearchUser);
router.get('/get/:id', auth, Get_UserInfo);
router.delete('/deleteuser/:id', auth, Delete_UserInfo);
router.put('/updateuser/:id', auth, Update_UserInfo);
router.get('/users', auth, AllUsers);


export default router