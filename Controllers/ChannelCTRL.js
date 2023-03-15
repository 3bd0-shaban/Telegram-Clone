import { asyncHandler } from '../Middlewares/asyncHandler.js';
import ChannelDiscriminator from '../Models/ChannelDiscriminator.js';
import Chat from '../Models/Chat.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import cloudinary from './../Utils/cloudinary.js';


export const NewChannel = asyncHandler(async (req, res, next) => {
    const { channelName, info, icon } = req.body
    const ColorsArray = [
        '#7f1d1d', '#18181b', '#7c2d12', '#78350f', '#713f12', '#365314', '#1e3a8a', '#312e81', '#4c1d95', '#831843', '#881337'
    ];
    const color = ColorsArray[Math.floor(Math.random() * ColorsArray.length)];

    if (!channelName) {
        return next(new ErrorHandler('Channel Name is required'), 400)
    }
    let result;
    if (icon) {
        result = await cloudinary.uploader.upload(icon, {
            folder: "Telegram/ChatsIcon",
            transformation: [
                { width: 500, quality: 'auto' }
            ],
            resource_type: 'auto'
        });
    }
    await new ChannelDiscriminator({
        members: [req.user.id], isChannel: true, owner: req.user.id, channelName, info, color, admin: [req.user.id],
        Icon: {
            public_id: result?.public_id,
            url: result?.secure_url,
        }
    }).save()
        .then((chat) => {
            return res.json(chat);
        })
        .catch((err) => {
            return next(new ErrorHandler(err.message, 404));
        })
});

export const AddUserstoChannel = asyncHandler(async (req, res, next) => {
    const members = [...req.body.members]
    const newMembers = await Chat.findOneAndUpdate({ _id: req.params.id },
        {
            members: { $push: members }
        },
        { new: true });
    return res.json(newMembers);
});

export const MembertoAdmin = asyncHandler(async (req, res, next) => {
    const Admins = req.body.admin
    const newAdmin = await Chat.findOneAndUpdate({ _id: req.params.id },
        {
            Admins: { $push: Admins }
        },
        { new: true });
    return res.json(newAdmin);
});

export const RemoveAdmin = asyncHandler(async (req, res, next) => {
    const Admin = req.body.admin
    const newAdmin = await Chat.findOneAndUpdate({ _id: req.params.id },
        {
            Admins: { $pull: Admin }
        },
        { new: true });
    return res.json({ msg: 'Removed !' });
});

export const RemoveMember = asyncHandler(async (req, res, next) => {
    const member = req.body.member
    const newAdmin = await Chat.findOneAndUpdate({ _id: req.params.id },
        {
            members: { $pull: member }
        },
        { new: true });
    return res.json({ msg: 'Removed !' });
});

export const ChangePrivacy = asyncHandler(async (req, res, next) => {
    const privacy = req.body.privacy
    const newAdmin = await Chat.findOneAndUpdate({ _id: req.params.id },
        {
            Privacy: { $set: privacy }
        },
        { new: true });
    return res.json(newAdmin);
});

export const History = asyncHandler(async (req, res, next) => {
    const history = req.body.history
    const newAdmin = await Chat.findOneAndUpdate({ _id: req.params.id },
        {
            Privacy: { $set: history }
        },
        { new: true });
    return res.json(newAdmin);
});

