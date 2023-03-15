import mongoose from "mongoose";
import Chat from "./Chat.js";
const ChannelDiscriminator = Chat.discriminator(
    'Channel',
    new mongoose.Schema(
        {
            owner: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            Admins: [
                {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User'
                }
            ],
            color: {
                type: String,
            },
            Icon: {
                public_id: {
                    type: String,
                },
                url: {
                    type: String,
                },
            },
            channelName: {
                type: String,
                required: true,
            },
            info: {
                type: String,
            },
        },
        { discriminatorKey: 'kind' }
    )
)
export default ChannelDiscriminator