import Users from '../Models/Users.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import Jwt from 'jsonwebtoken';
import { asyncHandler } from '../Middlewares/asyncHandler.js'
import Features from '../Utils/Features.js'
import cloudinary from './../Utils/cloudinary.js';

export const UserInfo = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id);
    if (!user) return next(new ErrorHandler("User Not Founded !", 404));
    res.json(user);
});

export const SearchUser = asyncHandler(async (req, res) => {
    const { email } = req.query
    const features = new Features(Users.find({ email }).limit(5), req.query).search()
    const users = await features.query
    if (!users) return next(new ErrorHandler("User Not Founded !", 404));
    res.json(users);
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

export const SetFullname = asyncHandler(async (req, res, next) => {
    const { firstname, lastname } = req.body
    if (!firstname) {
        return next(new ErrorHandler("Must provide first name"), 401);
    }
    const user = await Users.findByIdAndUpdate({ _id: req.user.id },
        req.body, { new: true });
    return res.json({user});

});
export const updateProfilePic = asyncHandler(async (req, res, next) => {
    const file = req.body.avatar;
    const result = await cloudinary.uploader.upload(file, {
        folder: "Telegram/User",
        transformation: [
            { width: 500, quality: 'auto' }
        ],
        resource_type: 'auto'
    });
    const user = await Users.findByIdAndUpdate({ _id: req.user.id },
        {
            avatar: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        }, { new: true });
    return res.json({ user });

});

export const AllUsers = asyncHandler(async (req, res) => {
    const user = await Users.find();
    res.json(user);
});
export const LogOut = asyncHandler(async (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.json({ msg: 'Loged Out' });
});
