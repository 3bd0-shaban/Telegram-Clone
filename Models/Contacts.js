import mongoose from "mongoose";
const ContactsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });
const Contacts = mongoose.model('Contact', ContactsSchema);
export default Contacts