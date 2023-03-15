import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema(
    {
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        }],
        lastMSG: {
            type: String
        },
        Admins: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ],
        Icon: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        info: {
            type: String,
        },
    },
    { timestamps: true }
);
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;