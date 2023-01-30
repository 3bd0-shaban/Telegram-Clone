import mongoose from 'mongoose';
const groupSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        admins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
        },
        info: {
            type: String,
        },
        pinnedMessage: {
            type: String,
        },
        privacy: {
            type: String,
            default: 'Public',
            enum: ['public', 'secert']
        },
        privacy: {
            type: String,
            default: 'visible',
            enum: ['hidden', 'visible']
        },
        permissions: {
            sendMessages: {
                type: Boolean,
                default: true
            },
            sendMedia: {
                type: Boolean,
                default: true
            },
            sendPolls: {
                type: Boolean,
                default: true
            },
            addUsers: {
                type: Boolean,
                default: true
            },
            pinMessages: {
                type: Boolean,
                default: true
            },
            changeChatInfo: {
                type: Boolean,
                default: true
            },

        },
        image: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        },

    },
    { timestamps: true, minimize: false }
);
const Group = mongoose.model('Group', groupSchema);
export default Group;