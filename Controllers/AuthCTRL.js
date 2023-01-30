import Users from '../Models/Users.js';
import { asyncHandler } from './../Middlewares/asyncHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import send_Email from '../Utils/sendEmail.js';


export const SignIn = asyncHandler(async (req, res) => {
    const { email, country } = req.body;
    if (!email) return res.status(400).json({ msg: 'Please fill all fields' });
    if (!validateEmail(email)) {
        return next(new ErrorHandler("Invailed Email !", 404));
    } else {
        req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        req.app.locals.resetsession = true
        send_Email(email, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)

        return res.json({ msg: 'Please confirm email' });

    }
});
export const activateEmail = asyncHandler(async (req, res, next) => {

    const { email, code, country } = req.query;
    const user = await Users.findOne({ email })
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        if (!user) {
            new Users({
                email, country
            }).save()
                .then(user => {
                    const accessToken = createAccessToken({ _id: user.id, roles: user.roles });
                    const refresh_Token = createRefreshToken({ _id: user._id, roles: user.roles });
                    res.cookie('Jwt', refresh_Token, {
                        httpOnly: true,
                        path: '/',
                        secure: process.env.NODE_ENV === "production" ? true : false,
                        expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24), // 7d
                        sameSite: 'none'
                    });
                    return res.json({ msg: "Your email verified successfully", accessToken });
                })
                .catch(err => {
                    return res.status(400).json({ msg: err.message });
                })
        }
        const accessToken = createAccessToken({ id: user.id, roles: user.roles });
        const refresh_Token = createRefreshToken({ id: user._id, roles: user.roles });
        res.cookie('Jwt', refresh_Token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === "production" ? true : false,
            expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24), // 7d
            sameSite: 'none'
        });
        return res.json({ msg: "Your email verified successfully", accessToken });
    }
    return next(new ErrorHandler('Invalid OTP !', 400));
    // return next(new ErrorHandler('Email not founded !', 400));

});

export const Request2OTPActivate = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    send_Email(email, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)
    await Users.updateOne({ email }, { otp: req.app.locals.OTP }, { new: true });
    return res.json({ msg: "Access Granted !" })
});

export const RefreshToken = asyncHandler((req, res, next) => {
    const refreshToken = req.cookies.Jwt
    if (!refreshToken) {
        return next(new ErrorHandler('Sign In First', 400));
    }
    Jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
        if (err) {
            return next(new ErrorHandler('Authorization Failed, Please Log In Again', 400));
        }
        const accessToken = createAccessToken({ id: user.id, roles: user.roles });
        return res.json({ accessToken })
    });
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

export const GenerateOtp = asyncHandler(async (req, res, next) => {
    const { email } = req.query
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const user = await Users.findOneAndUpdate({ email }, { otp: req.app.locals.OTP }, { new: true });
    const to = user.email
    send_Email(to, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)
    return res.send({ code: req.app.locals.OTP });

});


export const VerifyOtp = asyncHandler(async (req, res, next) => {
    const { code, email } = req.query;
    const user = await Users.findOne({ email })
    if (parseInt(req.app.locals.OTP) === parseInt(code) && user.otp == parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetsession = true
        return res.json({ msg: 'Verified Successflly' })
    }
    return next(new ErrorHandler('Invalid OTP !', 400));
});

export const CreateResetSession = asyncHandler(async (req, res, next) => {
    // const { code } = req.query;
    if (req.app.locals.resetsession) {
        req.app.locals.resetsession = true
        return res.json({ msg: "Access Granted !" })
    }
    return next(new ErrorHandler('OTP Expired !', 400));
});

export const ResetPassword = asyncHandler(async (req, res, next) => {

    if (!req.app.locals.resetsession) {
        return next(new ErrorHandler('Session Expired !', 400));
    }
    const { password, confirmpassword, email } = req.body;
    if (!password || !confirmpassword) {
        return next(new ErrorHandler('Fill all fields'), 400)
    }
    if (password !== confirmpassword) {
        return next(new ErrorHandler('Passwords do not match'), 400);
    }
    if (password.lenght <= 6) {
        return next(new ErrorHandler('Passowrd must be more than 6 characters', 400));
    }
    Users.findOne({ email })
        .then(user => {
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    Users.updateOne({ email: user.email },
                        { password: hashedPassword }, function (err, data) {
                            if (err) throw err;
                            req.app.locals.resetsession = false; // reset session
                            return res.json({ msg: "Record Updated...!" })
                        });
                })
                .catch(e => {
                    return next(new ErrorHandler('Enable to hashed password', e.message, 400));
                })
        })
        .catch(error => {
            return next(new ErrorHandler('Email not founded', 400));
        })
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