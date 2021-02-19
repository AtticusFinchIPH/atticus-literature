import mongoose from 'mongoose';
import { ProductEnumOrigin, ProductEnumCurrency, ProductEnumLanguage } from '../enums/productEnums'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String },
    image: { type: String, required: true},
    authorId: { type: mongoose.Schema.ObjectId, ref: 'Author' },
    origin: { 
        type: String,
        enum: Object.values(ProductEnumOrigin),
    },
    language: { 
        type: String,
        enum: Object.values(ProductEnumLanguage),
        default: ProductEnumLanguage.VIETNAMESE,
    },
    genres: { type: String },
    publisher: { type: String },
    publishYear: { type: Date },
    price: { type: Number, required: true },
    currency: { 
        type: String, 
        enum: Object.values(ProductEnumCurrency),
        default: ProductEnumCurrency.USD,
    },
    inStock: { type: Number, required: true},
    reviews: [{
        userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
        stars: { type: Number, required: true },
        content: { type: String },
    }]
})

const productModel = mongoose.model("Product", productSchema);

export default productModel;