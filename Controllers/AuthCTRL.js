import Users from '../Models/Users.js';
import { asyncHandler } from './../Middlewares/asyncHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import otpGenerator from 'otp-generator'
import Jwt from 'jsonwebtoken';
import send_Email from '../Utils/sendEmail.js';


export const SignIn = asyncHandler(async (req, res) => {
    const { email, country } = req.body;
    if (!email) return res.status(400).json({ msg: 'Please fill all fields' });
    if (!validateEmail(email)) {
        return next(new ErrorHandler("Invailed Email !", 404));
    } else {
        // return GenerateOtp(email)
        req.app.locals.OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        req.app.locals.resetsession = true
        console.log(req.app.locals.OTP)
        send_Email(email, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)
        return res.json({ msg: 'Please confirm email' });
    }
});
export const activateEmail = asyncHandler(async (req, res, next) => {

    const { email, code, country } = req.body;
    const ColorsArray = [
        '#7f1d1d', '#18181b', '#7c2d12', '#78350f', '#713f12', '#365314', '#1e3a8a', '#312e81', '#4c1d95', '#831843', '#881337'
    ];
    const color = ColorsArray[Math.floor(Math.random() * ColorsArray.length)];

    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        const user = await Users.findOne({ email })
        // req.app.locals.OTP = null;
        if (!user) {
            const username = email.split('@')[0]
            const save = await new Users({ email, country, otp: req.app.locals.OTP, username, color }).save()
            const accessToken = createAccessToken({ id: save.id, roles: save.roles });
            const refresh_Token = createRefreshToken({ id: save.id, roles: save.roles });
            res.cookie('Jwt', refresh_Token, {
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === "production" ? true : false,
                expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24), // 7d
                sameSite: 'none'
            });
            return res.json({ msg: "Your email verified successfully", accessToken });
        }
        const accessToken = createAccessToken({ id: user.id, roles: user.roles });
        const refresh_Token = createRefreshToken({ id: user.id, roles: user.roles });
        res.cookie('Jwt', refresh_Token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === "production" ? true : false,
            expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24), // 7d
            sameSite: 'none'
        });
        return res.json({ msg: "Your email verified successfully", user, accessToken });

    }
    // return next(new ErrorHandler('An Error accured', 400));
    return next(new ErrorHandler('Invalid OTP !', 400));

});

export const RequestActivate = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    send_Email(email, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)
    await Users.updateOne({ email }, { otp: req.app.locals.OTP }, { new: true });
    return res.json({ msg: "Access Granted !" })
});

export const RefreshToken = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.Jwt
    if (!refreshToken) {
        return next(new ErrorHandler('Sign In First', 400));
    }
    const auth = Jwt.verify(refreshToken, process.env.JWT_REFRESH)
    if (!auth) {
        return next(new ErrorHandler('Authorization Failed, Please Log In Again', 400));
    }
    const accessToken = createAccessToken({ id: auth.id, roles: auth.roles });
    const user = await Users.findOne({ _id: auth.id })
    return res.json({ accessToken, user })
});


export const logout = asyncHandler((req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return next(new ErrorHandler('You Are Not Logged In', 400));
    }
    Jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            Jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return next(new ErrorHandler('Authorization Failed, Please Log In Again', 400));
                }
                res.clearCookie(`${user.id}`);
                req.cookies[`${user.id}`] = "";
                return res.json({ msg: "Successfully Logged Out" });
            })
        }
    });
});




export const LogOut = asyncHandler(async (req, res, next) => {
    res.clearCookie('token', { path: '/', maxAge: 1 });
    res.clearCookie('Logged_in', { path: '/', maxAge: 1 });
    res.clearCookie('Admin', { path: '/' });
    return res.json({ msg: 'Loged Out' });
});


function validateEmail(email) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}
const createAccessToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })
}
const createRefreshToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '7d' })
}

const GenerateOtp = asyncHandler(async (req, res, next, email) => {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const user = await Users.findOneAndUpdate({ email }, { otp: req.app.locals.OTP }, { new: true });
    const to = user.email
    send_Email(to, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)
    return res.json({ msg: 'Please confirm email' });

});