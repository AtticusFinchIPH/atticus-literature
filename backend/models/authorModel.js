import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    _id: { type: String },
    image: { type: String },
})

const authorModel = mongoose.model("Author", authorSchema);

export default authorModel;