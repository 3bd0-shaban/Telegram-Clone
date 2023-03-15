import mongoose from "mongoose";
import Chat from "./Chat.js";
const GroupDiscriminator = Chat.discriminator(
    'Group',
    new mongoose.Schema(
        {
            owner: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            groupName: {
                type: String,
                required: true,
            },
            color:{
                type:String,
            },
            privacy: {
                type: String,
                default: 'public',
                enum: ['public', 'privat'],
            },
            History: {
                type: String,
                default: 'visible',
                enum: ['visible', 'hidden'],
            },
            pinned: [
                {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Message'
                }
            ],
            Permissions: {
                sendMessages: {
                    type: Boolean,
                    default: true,
                },
                sendMedia: {
                    type: Boolean,
                    default: true,
                },
                sendPolls: {
                    type: Boolean,
                    default: true,
                },
                addUsers: {
                    type: Boolean,
                    default: true,
                },
                pinMessage: {
                    type: Boolean,
                    default: true,
                },
                changeChatInfo: {
                    type: Boolean,
                    default: true,
                },
            },

        },
        { discriminatorKey: 'kind' }
    )
)
export default GroupDiscriminator