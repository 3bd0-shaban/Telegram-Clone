import mongoose from "mongoose";
const ContactsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contacts: [
        {
            contactId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
            },
            email:{
                type:String
            },
            username:{
                type:String
            }
        }
    ]
}, { timestamps: true });
const Contacts = mongoose.model('Contact', ContactsSchema);
export default Contacts