import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
})

const authorModel = mongoose.model("Author", authorSchema);

export default authorModel;