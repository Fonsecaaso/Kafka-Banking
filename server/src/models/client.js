import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    amount:{
        type: Number,
        required: true
    }
});

export default mongoose.model('Client', schema);
