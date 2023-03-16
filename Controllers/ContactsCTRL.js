import Contacts from "../Models/Contacts.js";
import ErrorHandler from './../Utils/errorHandler.js';
import { asyncHandler } from '../Middlewares/asyncHandler.js';
export const newContact = asyncHandler(async (req, res, next) => {
    const isAlreadyinContact = await Contacts.findOne({
        $in: [
            { Contacts: { $elemMatch: { $eq: req.body.contactId } } },
        ],
    })

    if (isAlreadyinContact) {
        return next(new ErrorHandler('Already in your contact', 400));
    }
    const contact = await Contacts.findOneAndUpdate({ user: req.user }, { Contacts: { $push: req.body.contactId } }, { new: true });
    return res.json(contact)
});

export const GetContacts = asyncHandler(async (req, res, next) => {
    const contacts = await Contacts.find({ user: req.user.id })
        .populate('contacts', 'username avatar firstname lastname')
    if (!contacts) {
        return next(new ErrorHandler('No Contacts founded', 400));
    }
    return res.json(contacts)
});