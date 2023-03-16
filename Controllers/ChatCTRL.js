import { asyncHandler } from '../Middlewares/asyncHandler.js';
import Chat from '../Models/Chat.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import Message from './../Models/Message.js';
import Features from './../Utils/Features.js';
import Contacts from './../Models/Contacts.js';

export const New_Chat = asyncHandler(async (req, res, next) => {
    const isAlreadyinChat = await Chat.findOne({
        $and: [
            { members: { $elemMatch: { $eq: req.user.id } } },
            { members: { $elemMatch: { $eq: req.params.id } } },
        ],
    }).populate("members")
    if (isAlreadyinChat) {
        // const ChatID = isAlreadyinChat.members.find(p => p.id !== req.user.id)
        return res.json(isAlreadyinChat._id)
    }
    await new Chat({
        members: [req.user._id, req.params.id]
    }).save()
        .then((chat) => {
            return res.json(chat._id);
        })
        .catch((err) => {
            return next(new ErrorHandler(err.message, 404));
        })
});
export const Get_ALL = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Chat.find(
        {
            members: { $in: [req.user.id] },
            lastMSG: { $ne: null }
        }), req.query)
        .Pagination(resultperpage)
    const Chats = await features.query
        .populate('members', 'username avatar firstname lastname')
        .sort('-updatedAt')
    for (let i = 0; i < Chats.length; i++) {
        if (Chats[i].members && Chats[i].members.length > 2) {
            delete Chats[i].members;
        }
    }
    return res.json(Chats)
});

export const Get_Single_Chat = asyncHandler(async (req, res, next) => {
    const singleChat = await Chat.findById(req.params.id)
        .populate('members', 'username avatar firstname lastname')

    const totalMembers = singleChat.members?.length
    if (totalMembers > 2) {
        delete singleChat.members;
    }
    const chatFriend = singleChat.members.filter(p => p._id === req.user.id);
    let isContact;
    const isExist = await Contacts.findOne({ user: req.user.id, contacts: chatFriend });
    if (isExist) {
        isContact = true;
    } else {
        isContact = false;
    }
    return res.status(200).json({ singleChat, totalMembers, isContact })
});
