import mongoose from 'mongoose';
import { UserEnumRole } from '../enums/userEnums';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    nickName: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true, trim: true},
    address: { type: String },
    phone: { type: String },
    role: { 
        type: String, 
        enum: Object.values(UserEnumRole),
        default: UserEnumRole.CLIENT,
        required: true, 
    },
    favorites: [{type: mongoose.Schema.ObjectId, ref: 'Product'}],
    orders: [{type: mongoose.Schema.ObjectId, ref: 'Order'}],
})

const userModel = mongoose.model("User", userSchema);

export default userModel;