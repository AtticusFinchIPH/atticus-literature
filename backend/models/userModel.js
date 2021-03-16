import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    nickName: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true, trim: true},
    address: { type: String },
    city: { 
        name: { type: String, required: true },
    },
    state: { 
        name: { type: String, required: true },
        isoCode: { type: String, required: true },
    },
    country:  { 
        name: { type: String, required: true },
        isoCode: { type: String, required: true },
    },
    phone: { type: String },
    role: { 
        type: String,
        ref: 'UserEnumRole',
        required: true, 
    },
    favorites: [{type: mongoose.Schema.ObjectId, ref: 'Product', unique: true}],
    orders: [{type: mongoose.Schema.ObjectId, ref: 'Order', unique: true}],
})

const userModel = mongoose.model("User", userSchema);

export default userModel;