import mongoose from 'mongoose';
const usersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 50
        },
        username: {
            type: String,
            unique: true,
            min: 3,
            max: 50
        },
        bio: {
            type: String,
        },
        firstname: {
            type: String,
            // required: true
        },
        lastname: {
            type: String,
        },
        country: {
            type: String
        },
        otp: {
            type: String,
        },
        roles:{
            type:Array,
            default:['user']
        },
        avatar: [
            {
                default: [],
                public_id: {
                    type: String,
                    required: [true, 'The Product image is Required'],
                },
                url: {
                    type: String,
                    required: [true, 'The Product image is Required'],
                },
                active: {
                    type: Boolean,
                    default: true
                }
            }
        ]
    },
    { timestamps: true, minimize: false }
);
const Users = mongoose.model('Users', usersSchema);
export default Users;