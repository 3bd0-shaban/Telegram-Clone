import Contacts from "../Models/Contacts.js";
import ErrorHandler from './../Utils/errorHandler.js';
import { asyncHandler } from '../Middlewares/asyncHandler.js';
export const newContact = asyncHandler(async (req, res, next) => {
    const { firstname, lastname, contactId, username, email } = req.body;
    const iscontact = await Contacts.findOne({ user: req.user.id })
    // const isAlreadyinContact = await Contacts.findOne({
    //     Contacts: { $elemMatch: { contactId: req.body.contactId } },
    // })
    // if (isAlreadyinContact) {
    //     return next(new ErrorHandler('Already in your contact', 400));
    // }
    console.log(req.body)
    if (!firstname) {
        return next(new ErrorHandler('firstname is required', 400));
    }
    if (iscontact) {
        const contact = await Contacts.findOneAndUpdate({ user: req.user.id },
            {
                $push:
                    { contacts: req.body }
            },
            { new: true });
        return res.json(contact)
    } else {
        await new Contacts({ contacts: req.body, user: req.user.id })
            .save()
            .then(contact => {
                return res.json(contact)
            })
            .then((error) => {
                return next(new ErrorHandler(error.message, 400));
            })
    }
});

export const GetContacts = asyncHandler(async (req, res, next) => {
    const contacts = await Contacts.findOne({ user: req.user.id })
        .populate('contacts', 'username avatar firstname lastname')
    if (!contacts) {
        return next(new ErrorHandler('No Contacts founded', 400));
    }
    return res.json(contacts)
});