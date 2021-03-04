import mongoose from 'mongoose';

const EnumSchema = new mongoose.Schema({
    _id: { type: String, required: true},
})

const OrderEnumStatus = mongoose.model("OrderEnumStatus", EnumSchema)
const OrderEnumPaymentMethod = mongoose.model("OrderEnumPaymentMethod", EnumSchema)

export { OrderEnumStatus, OrderEnumPaymentMethod };