import Users from '../Models/Users.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import Jwt from 'jsonwebtoken';
import { asyncHandler } from '../Middlewares/asyncHandler.js'
import sendEmail from './../Utils/sendEmail.js';
import Features from '../Utils/Features.js'
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

export const UserInfo = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id);
    if (!user) return next(new ErrorHandler("User Not Founded !", 404));
    res.json(user);
});

export const SearchUser = asyncHandler(async (req, res) => {
    const { email } = req.query
    const features = new Features(Users.find({ email }).limit(5), req.query).search()
    const user = await features.query
    if (!user) return next(new ErrorHandler("User Not Founded !", 404));
    res.json(user);
});

export const userByusername = asyncHandler(async (req, res) => {
    const user = await Users.findOne({ username: req.params.username });
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
