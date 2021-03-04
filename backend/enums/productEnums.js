import mongoose from 'mongoose';

const EnumSchema = new mongoose.Schema({
    _id: { type: String, required: true},
})

const ProductEnumOrigin = mongoose.model("ProductEnumOrigin", EnumSchema)
const ProductEnumGenre = mongoose.model("ProductEnumGenre", EnumSchema)
const ProductEnumCurrency = mongoose.model("ProductEnumCurrency", EnumSchema)
const ProductEnumLanguage = mongoose.model("ProductEnumLanguage", EnumSchema)

export { ProductEnumOrigin, ProductEnumGenre, ProductEnumCurrency, ProductEnumLanguage };