import express from 'express';
import {
     Delete_UserInfo, userByusername, Update_UserInfo, UserInfo, SearchUser, updateProfilePic, SetFullname
} from '../Controllers/UserCTRL.js';
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.get('/info', auth, UserInfo);
router.get('/userinfo', auth, UserInfo);
router.get('/search', auth, SearchUser);
router.get('/get/:username', auth, userByusername);
router.delete('/deleteuser/:id', auth, Delete_UserInfo);
router.put('/updateuser/:id', auth, Update_UserInfo);
router.put('/updatepic', auth, updateProfilePic);
router.put('/setname', auth, SetFullname);


export default router