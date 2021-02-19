import mongoose from 'mongoose';

const EnumSchema = new mongoose.Schema({
    _id: { type: String, required: true},
})

const UserEnumRole = mongoose.model("UserEnumRole", EnumSchema)

export { UserEnumRole };