import { asyncHandler } from '../Middlewares/asyncHandler.js';
import Chat from '../Models/Chat.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import Features from './../Utils/Features.js';
import GroupDiscriminator from './../Models/GroupDiscriminator.js';

export const NewGroup = asyncHandler(async (req, res, next) => {
    // const users = [...req.body.members]
    await new Chat({
        members: [...req.body.members, req.user.id]
    }).save()
        .then((chat) => {
            return res.json(chat);
        })
        .catch((err) => {
            return next(new ErrorHandler(err.message, 404));
        })
});
export const GetGroup = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(GroupDiscriminator.find(
        {
            members: { $in: [req.user.id] },
            lastMSG: { $ne: null }
        }), req.query)
        .Pagination(resultperpage)

    const Chats = await features.query
        .populate('members', 'username avatar firstname lastname')
        .sort('-updatedAt')
    return res.json(Chats)
});
