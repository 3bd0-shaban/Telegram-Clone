import jwt from "jsonwebtoken";
import Users from '../Models/Users.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import { asyncHandler } from "./asyncHandler.js";
export const auth = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return next(
        new ErrorHandler('You Are Not Authorized, Please log in again', 403)
    );
    const token = authHeader.split(' ')[1]
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) return next(
        new ErrorHandler('You Are Not Authorized, Please log in again', 403)
    );
    req.user = await Users.findById(verify.id);
    next()
});

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.some(role => req.user.roles.includes(role))) {
            return next(
                new ErrorHandler(`Role: ${roles.includes(req.user)} is not allowed to access this resouce `, 403)
            );
        }
        next();
    };
};
export const LocalVariable = (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetsession: false
    }
    next();
};

export const CheckUser = asyncHandler(async (req, res, next) => {
    const { email } = req.method == "GET" ? req.query : req.body;
    // check the user existance
    let exist = await Users.findOne({ email });
    if (!exist) {
        return next(
            new ErrorHandler('User not Founded', 403)
        );
    }
    next();

});

export const CheckVerification = asyncHandler(async (req, res, next) => {
    let user = await Users.findOne({ _id: req.user.id });
    if (!user.isVerified) {
        return next(
            new ErrorHandler('Your Email not verified, please verify email first', 403)
        );
    }
    next();

})