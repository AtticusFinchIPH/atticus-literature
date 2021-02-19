import mongoose from 'mongoose';
import { OrderEnumStatus, OrderEnumPaymentMethod } from '../enums/orderEnums';
import { ProductEnumCurrency } from '../enums/productEnums';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectID, ref: 'User'},
    items: [{
        productId:{ type: mongoose.Schema.ObjectID, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    receiver: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { 
        type: String, 
        enum: Object.values(OrderEnumStatus),
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    paymentMethod: { 
        type: String, 
        enum: Object.values(OrderEnumPaymentMethod),
        required: true,
    },
    total: { type: Number, required: true },
    currency: { 
        type: String, 
        enum: Object.values(ProductEnumCurrency),
        default: ProductEnumCurrency.USD,
    },
})

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;