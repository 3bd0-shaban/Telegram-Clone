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
            color: {
                type: String,
            },
            channelName: {
                type: String,
                required: true,
            },
        },
        { discriminatorKey: 'kind' }
    )
)
export default ChannelDiscriminator