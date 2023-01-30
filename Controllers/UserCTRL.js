import Users from '../Models/Users.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { asyncHandler } from '../Middlewares/asyncHandler.js'
import sendEmail from './../Utils/sendEmail.js';
const { Client_URL } = process.env;

export const SignUp = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(new ErrorHandler("Email Requried ! !", 404));
    const isEmail = await Users.findOne({ email });
    if (isEmail) return next(new ErrorHandler("Email Exist !", 404));
    new Users({ email })
        .save()
        .then((user) => {
            sendEmail({
                to: user.email,
                subject: "Password Reset Request",
            });
            return res.json({
                success: true,
                message: 'Saved', user
            });
        })
        .catch((err) => {
            return next(new ErrorHandler(err.message, 404));
        });
});
export const SignIn = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: 'Please fill all fields' });
    if (!validateEmail(email)) {
        return next(new ErrorHandler("Invailed Email !", 404));
    } else {
        const user = await Users.findOne({ email });
        if (!user) return next(new ErrorHandler("Wrong Email !", 404));
        else {
            const token = createToken({ id: user._id });
            res.cookie('token', token, {
                httpOnly: true,
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 Day
                sameSite: 'lax',
            });
            return res.json({ user, token });
        }
    }
});
export const RefreshToken = asyncHandler((req, res, next) => {
    const UserId = req.id;
    const cookie = req.headers.cookie;
    if (!cookie) return next(new ErrorHandler("Sign In First", 404));
    const oldtoken = cookie.split('=')[1];
    if (!oldtoken) {
        return res.status(500).json({ msg: 'No Token Found' });
    }
    Jwt.verify(oldtoken, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(new ErrorHandler("Failed Authorization, Please log in again !", 404));
        req.id = user.id;
        next();
    });
});
export const UserInfo = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id);
    if (!user) return next(new ErrorHandler("User Not Founded !", 404));
    res.json(user);
});
export const Get_UserInfo = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User Not Founded !", 404));
    res.json(user);
});
export const Update_UserInfo = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User Not Founded with that Id !", 404));
    else {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.json(user);
    }
});
export const Delete_UserInfo = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User Not Founded with that Id !", 404));
    else {
        await Users.deleteOne({ _id: req.params.id });
        return res.json({ msg: 'User deleted successfully' });
    }
});
export const logout = asyncHandler((req, res) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split('=')[1];
    if (!prevToken) return next(new ErrorHandler("You are not logged in!", 404));
    Jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            Jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
                if (err) return next(new ErrorHandler("Failed Authorization!", 404));
                res.clearCookie(`${user.id}`);
                req.cookies[`${user.id}`] = '';
                return res.status(200).json({ msg: 'Successfully Logged Out' });
            });
        }
    });
});

export const ForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) return next(new ErrorHandler("Please enter a vailed email !", 404));
    const user = await Users.findOne({ email });
    if (!user) return next(new ErrorHandler("Invalid Email !", 404));
    const access_Token = createAccessToken({ id: user._id });
    const url = `${Client_URL}` / user / `${access_Token}`;
    send_Email(email, url, 'reset Your Password');
    res.status(200).json({ msg: 'Email Send Successfully' });
});
export const ResetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const slat = await bcrypt.genSalt();
    const HashedPassword = await bcrypt.hash(password, slat);
    await Users.findByIdAndUpdate({ _id: req.user.id });
    password: HashedPassword;
    return res.json({ msg: 'Password Cahnged Successfully' });
});
export const AllUsers = asyncHandler(async (req, res) => {
    const user = await Users.find();
    res.json(user);
});
export const LogOut = asyncHandler(async (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.json({ msg: 'Loged Out' });
});
function validateEmail(email) {
    var re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}
const createToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};
const createAccessToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_SCCESS, { expiresIn: '15m' });
};
const createRefreshToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '7d' });
};
