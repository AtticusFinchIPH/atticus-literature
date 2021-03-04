import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User'},
    items: [{
        productId:{ type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
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
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { 
        type: String, 
        ref: 'OrderEnumStatus',
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    paymentMethod: { 
        type: String, 
        ref: 'OrderEnumPaymentMethod',
        required: true,
    },
    total: { type: Number, required: true },
    currency: { 
        type: String, 
        ref: 'ProductEnumCurrency',
        required: true,
    },
})

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;