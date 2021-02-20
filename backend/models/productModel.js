import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String },
    image: { type: String, required: true},
    authorId: { type: mongoose.Schema.ObjectId, ref: 'Author' },
    origin: { 
        type: String, 
        ref: 'ProductEnumOrigin',
        required: true,
    },
    language: { 
        type: String, 
        ref: 'ProductEnumLanguage',
        required: true,
    },
    genres: [
        { 
            type: String, 
            ref: 'ProductEnumGenre',
            required: true,
        },
    ],
    categories: [
        {
            type: String,
            enum: ['bestsellers', 'recommendeds'],
        }
    ],
    publisher: { type: String },
    publishYear: { type: Date },
    price: { type: Number, required: true },
    currency: { 
        type: String, 
        ref: 'ProductEnumCurrency',
        required: true,
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